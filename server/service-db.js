module.exports.createUser = (name, id, users) => `INSERT INTO users (
  name,
  JSON,
  id,
  users
) VALUES (
  '${name}',
  '[]',
  '${id}',
  '${users}'
);`;

module.exports.updateDb = (id, JSON) => `
  UPDATE users SET JSON = '${JSON}'
  WHERE id = ${id};
`;

module.exports.updateUsers = (id, JSON) => `
  UPDATE users SET users = '${JSON}'
  WHERE id = ${id};
`;

module.exports.updateListUsers = (users) => `
  SET SQL_SAFE_UPDATES = 0;
  UPDATE users SET users = '${users}';
`;
