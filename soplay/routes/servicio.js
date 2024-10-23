const express = require('express');
const router = express.Router();
const ServicioController = require('../controller/ServicioController.js');

// Rutas
router.post('/', ServicioController.addServicio);
router.get('/:id', ServicioController.getServicioById);
router.get('/', ServicioController.getAllServicios);
router.delete('/:id', ServicioController.deleteServicio);
router.put('/:id', ServicioController.updateServicio);

module.exports = router;
