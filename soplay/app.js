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
const servicioRoutes = require('./routes/servicio.js');
const direccionRoutes = require('./routes/direccion.js');

app.use('/api/v1/usuario', usuarioRoutes);
app.use('/api/v1/servicio', servicioRoutes);
app.use('/api/v1/direccion', direccionRoutes);

// Midelware de rutas para la autenticacion


// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


