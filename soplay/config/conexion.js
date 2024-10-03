const mysql = require('mysql2/promise');

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'soplay'
  });
  return connection;
};


module.exports = createConnection;

