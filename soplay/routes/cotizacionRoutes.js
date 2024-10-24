const express = require('express');
const router = express.Router();
const cotizacionController = require('../controller/cotizacionController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');

router.post('/', proctectedRoutes, checkRole(['ENCARGADO']), cotizacionController.addCotizacion);
router.get('/:id', proctectedRoutes, cotizacionController.getCotizacionById);
router.get('/', proctectedRoutes, checkRole(['ENCARGADO']), cotizacionController.getAllCotizaciones);
router.delete('/:id', proctectedRoutes, cotizacionController.deleteCotizacion);
router.get('/usuario/:id', proctectedRoutes, checkRole(['CLIENTE']),cotizacionController.getAllCotizacionesByUsuario);

module.exports = router;