const mysql = require('mysql2/promise');

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'soplay'
  });
  console.log('Conectado a la base de datos MySQL');
  return connection;
};


module.exports = createConnection;

