const createConnection = require('./config/conexion.js'); // Ajusta la ruta según sea necesario

const main = async () => {
  try {
    const connection = await createConnection();

    
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

main();
