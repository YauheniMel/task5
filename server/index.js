const bodyParser = require('body-parser');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const { Router } = require('express');
const mysql = require('mysql');
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

const timeout = (req, res, next) => {
  setTimeout(() => next(), 500);
};

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersdb2',
  password: 'melnik123',
  multipleStatements: true,
});

const router = Router();

router.put('/api/login', timeout, async (req, res) => {
  const { name } = req.body;

  try {
    // eslint-disable-next-line consistent-return
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw new Error(err);

      const users = Object.values(JSON.parse(JSON.stringify(results)));

      let targetUser = users.find((user) => user.name === name);

      if (!targetUser) {
        connection.query(
          `${dbService.createUser(name, +new Date())} SELECT * FROM users`,
          (error, r) => {
            if (error) throw new Error(error);

            // eslint-disable-next-line @typescript-eslint/no-shadow
            const users = Object.values(JSON.parse(JSON.stringify(r)));

            targetUser = users[1].find((user) => user.name === name);

            return res.status(200).json(targetUser);
          },
        );
      } else {
        return res.status(200).json(targetUser);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/api/send', timeout, async (req, res) => {
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

      const myData = JSON.parse(me.JSON).map((item) => {
        // eslint-disable-next-line eqeqeq
        if (item.id == id) {
          item.sent.push({
            date: +new Date(),
            state: 'untouched',
            theme,
            content,
          });
        }

        return item;
      });

      const addresseeData = JSON.parse(addressee.JSON).map((item) => {
        // eslint-disable-next-line eqeqeq
        if (item.id == myId) {
          item.received.push({
            date: +new Date(),
            state: 'untouched',
            theme,
            content,
          });
        }

        return item;
      });

      const myJSON = JSON.stringify([...myData]);
      const addresseeJSON = JSON.stringify([...addresseeData]);
      console.log(myData);
      console.log(addresseeData);

      connection.query(
        `${dbService.sendMessage(myId, myJSON)}
        ${dbService.sendMessage(id, addresseeJSON)}`,
        (error) => {
          if (error) throw new Error(error);

          return res.status(200).json(myData);
        },
      );
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use(bodyParser.json());

app.use(router);

server.listen(port, () => {
  console.log(`running on port ${port}`);
});
