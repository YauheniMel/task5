module.exports.createUser = (name, id) => `INSERT INTO users (
  name,
  JSON,
  id
) VALUES (
  '${name}',
  '[]',
  '${id}'
);`;
