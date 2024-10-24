const express = require('expresse');
const router = express.Router();
const CotizacionController = require('../controller/CotizacionController.js');

router.post('/', CotizacionController.crearCotizacion);
router.get('/:id', CotizacionController.obtenerCotizacionPorId);
router.get('/', CotizacionController.obtenerTodasLasCotizaciones);
router.delete('/:id', CotizacionController.eliminarCotizacion);