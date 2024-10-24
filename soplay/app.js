const express = require('express');
const app = express();
const RUTA_BASE = '/api/v1';

//Cargar variable de entorno
require('dotenv').config();

// Middleware para analizar JSON
app.use(express.json());

// Midelware de rutas para la autenticacion
const authRoutes = require('./routes/authRoutes.js');
app.use(`${RUTA_BASE}/auth`, authRoutes);

// Middleware de errores
const errorHandler = require('./middlewares/errorHandler.js')
app.use(errorHandler);

// Rutas 
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const servicioRoutes = require('./routes/servicioRoutes.js');
const direccionRoutes = require('./routes/direccionRoutes.js');

app.use(`${RUTA_BASE}/usuario`, usuarioRoutes);
app.use(`${RUTA_BASE}/servicio`, servicioRoutes);
app.use(`${RUTA_BASE}/direccion`, direccionRoutes);

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


