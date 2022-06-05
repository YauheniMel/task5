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

app.use(bodyParser.json());

app.use(router);

server.listen(port, () => {
  console.log(`running on port ${port}`);
});
