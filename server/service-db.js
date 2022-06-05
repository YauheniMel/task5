module.exports.createUser = (name, id) => `INSERT INTO users (
  name,
  JSON,
  id
) VALUES (
  '${name}',
  '[]',
  '${id}'
);`;

module.exports.sendMessage = (id, JSON) => `
  UPDATE users SET JSON = '${JSON}'
  WHERE id = ${id};
`;
