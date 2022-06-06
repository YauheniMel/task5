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

module.exports.sendMessage = (id, JSON) => `
  UPDATE users SET JSON = '${JSON}'
  WHERE id = ${id};
`;

module.exports.updateUsers = (id, JSON) => `
  UPDATE users SET users = '${JSON}'
  WHERE id = ${id};
`;
