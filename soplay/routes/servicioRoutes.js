const express = require('express');
const router = express.Router();
const servicioController = require('../controller/servicioController.js');

// Rutas
router.post('/', servicioController.addServicio);
router.get('/:id', servicioController.getServicioById);
router.get('/', servicioController.getAllServicios);
router.delete('/:id', servicioController.deleteServicio);
router.put('/:id', servicioController.updateServicio);

module.exports = router;
