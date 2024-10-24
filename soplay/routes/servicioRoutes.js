const express = require('express');
const router = express.Router();
const servicioController = require('../controller/servicioController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');

// Rutas
router.post('/', proctectedRoutes, checkRole(['ENCARGADO']), servicioController.addServicio);
router.get('/:id', proctectedRoutes, servicioController.getServicioById);
router.get('/', servicioController.getAllServicios);
router.delete('/:id', proctectedRoutes, checkRole(['ENCARGADO']), servicioController.deleteServicio);
router.put('/:id', proctectedRoutes, checkRole(['ENCARGADO']), servicioController.updateServicio);

module.exports = router;
