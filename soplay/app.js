const express = require('express');
const app = express();
require('dotenv').config();


// Middleware para analizar JSON
app.use(express.json());
// Middleware de errores
const errorHandler = require('./middlewares/errorHandler.js')
app.use(errorHandler);

// Rutas 
const usuarioRoutes = require('./routes/usuario.js');
app.use('/usuario', usuarioRoutes);


// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


