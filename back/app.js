const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const RUTA_BASE = '/api/v1';

//Cargar variable de entorno
require('dotenv').config();

// Middleware para analizar JSON
app.use(express.json());

// Configurar cookie-parser
app.use(cookieParser());

// Asegurar que las fotos sean accesibles
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar CORS
const corsOptions = {
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true, 
    methods: '*', 
};

app.use(cors(corsOptions));

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
const cotizacionRoutes = require('./routes/cotizacionRoutes.js');
const cotizacionDetalladaRoutes = require('./routes/CotizacionDetalladaRoutes.js');

app.use(`${RUTA_BASE}/usuario`, usuarioRoutes);
app.use(`${RUTA_BASE}/servicio`, servicioRoutes);
app.use(`${RUTA_BASE}/direccion`, direccionRoutes);
app.use(`${RUTA_BASE}/cotizacion`, cotizacionRoutes);
app.use(`${RUTA_BASE}/cotizacion-detalle`, cotizacionDetalladaRoutes);

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
