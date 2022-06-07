const bodyParser = require('body-parser');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { Router } = require('express');
// eslint-disable-next-line import/order
const mysql = require('mysql');
const path = require('path');
const dbService = require('./service-db');

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.join('update');
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersdb2',
  password: 'melnik123',
  multipleStatements: true,
});

const router = Router();

router.put('/api/login', async (req, res) => {
  const { name } = req.body;

  try {
    // eslint-disable-next-line consistent-return
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      const arr = [];

      // eslint-disable-next-line array-callback-return
      users.forEach((user) => {
        arr.push({ name: user.name, id: user.id });
      });

      let targetUser = users.find((user) => user.name === name);

      if (!targetUser) {
        const id = +new Date();
        arr.push({ name, id });

        connection.query(
          `${dbService.createUser(
            name,
            id,
            JSON.stringify(arr),
          )}${dbService.updateListUsers(
            JSON.stringify(arr),
          )} SELECT * FROM users`,
          (error) => {
            if (error) throw new Error(error);

            connection.query('SELECT * FROM users', (e, r) => {
              if (e) throw new Error(e);

              const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

              targetUser = newUsers.find((user) => user.name === name);

              io.to('update').emit('users', targetUser.users);

              return res.status(200).json(targetUser);
            });
          },
        );
      } else {
        connection.query(
          `${dbService.updateUsers(
            targetUser.id,
            JSON.stringify(arr),
          )} SELECT * FROM users`,
          (error, r) => {
            if (error) throw new Error(error);

            // eslint-disable-next-line @typescript-eslint/no-shadow
            const users = Object.values(JSON.parse(JSON.stringify(r)));

            targetUser = users[1].find((user) => user.name === name);
            return res.status(200).json(targetUser);
          },
        );
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/api/send', async (req, res) => {
  const {
    id, myId, theme, content,
  } = req.body;

  try {
    // eslint-disable-next-line consistent-return
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      // eslint-disable-next-line eqeqeq
      const me = users.find((user) => user.id == myId);
      // eslint-disable-next-line eqeqeq
      const addressee = users.find((user) => user.id == id);

      const myData = JSON.parse(me.JSON);

      // eslint-disable-next-line eqeqeq
      const i = myData.findIndex((item) => item.id == id);
      // eslint-disable-next-line eqeqeq
      if (i == '-1') {
        myData.push({
          id,
          sent: [
            {
              date: +new Date(),
              state: 'untouched',
              theme,
              content,
            },
          ],
        });
      } else {
        if (!myData[i].sent) myData[i].sent = [];
        myData[i].sent.push({
          date: +new Date(),
          state: 'untouched',
          theme,
          content,
        });
      }

      const addresseeData = JSON.parse(addressee.JSON);

      // eslint-disable-next-line eqeqeq
      const idx = addresseeData.findIndex((item) => item.id == myId);
      // eslint-disable-next-line eqeqeq
      if (idx == '-1') {
        addresseeData.push({
          id: myId,
          received: [
            {
              date: +new Date(),
              state: 'untouched',
              theme,
              content,
            },
          ],
        });
      } else {
        if (!addresseeData[idx].received) addresseeData[idx].received = [];
        addresseeData[idx].received.push({
          date: +new Date(),
          state: 'untouched',
          theme,
          content,
        });
      }

      if (!myData[0]) {
        myData.push({
          id,
          sent: [
            {
              date: +new Date(),
              state: 'untouched',
              theme,
              content,
            },
          ],
        });
      }

      if (!addresseeData[0]) {
        addresseeData.push({
          id: myId,
          received: [
            {
              date: +new Date(),
              state: 'untouched',
              theme,
              content,
            },
          ],
        });
      }

      const myJSON = JSON.stringify([...myData]);
      const addresseeJSON = JSON.stringify([...addresseeData]);

      connection.query(
        `${dbService.updateDb(id, addresseeJSON)}
        ${dbService.updateDb(myId, myJSON)}`,
        (error) => {
          if (error) throw new Error(error);

          connection.query('SELECT * FROM users', (e, r) => {
            if (e) throw new Error(e);

            const newUsers = Object.values(JSON.parse(JSON.stringify(r)));

            const newTargetUser = newUsers.find((user) => +user.id === +id);

            io.to('update').emit('db', newTargetUser.JSON);
          });

          return res.status(200).json(myData);
        },
      );
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/api/touched', async (req, res) => {
  const { JSON, id } = req.body;
  try {
    connection.query(
      `${dbService.updateDb(id, JSON)} SELECT * FROM users`,
      (error) => {
        if (error) throw new Error(error);

        connection.query('SELECT * FROM users', (e, r) => {
          if (e) throw new Error(e);

          const newTargetUser = r.find((user) => +user.id === +id);

          io.to('update').emit('db', newTargetUser.JSON);
        });

        return res.status(200).json('Set touched');
      },
    );
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

app.use(bodyParser.json());

app.use(router);

server.listen(port, () => {
  console.log(`running on port ${port}`);
});
