const express = require('express');
const router = express.Router();
const cotizacionDetalladaController = require('../controller/cotizacionDetalladaController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');

router.post('/', proctectedRoutes, checkRole(['CLIENTE']), cotizacionDetalladaController.addCotizacionDetallada);
router.get('/:id_cotizacion/:id_servicio', proctectedRoutes, cotizacionDetalladaController.getCotizacionDetalladaById);
router.get('/:id_cotizacion', proctectedRoutes, cotizacionDetalladaController.getAllByCotizacionId);
router.delete('/:id_cotizacion/:id_servicio', proctectedRoutes, checkRole(['ENCARGADO']), cotizacionDetalladaController.deleteCotizacionDetallada);

module.exports = router;
