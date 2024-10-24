const express = require('expresse');
const router = express.Router();
const cotizacionController = require('../controller/cotizacionController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');

router.post('/', proctectedRoutes, checkRole(['ENCARGADO']), cotizacionController.crearCotizacion);
router.get('/:id', proctectedRoutes, cotizacionController.obtenerCotizacionPorId);
router.get('/', proctectedRoutes, checkRole(['ENCARGADO']), cotizacionController.obtenerTodasLasCotizaciones);
router.delete('/:id', proctectedRoutes, cotizacionController.eliminarCotizacion);