const express = require('express');
const router = express.Router();
const direccionController = require('../controller/direccionController.js');

// Rutas
router.post('/', direccionController.addDireccion);
router.get('/:id', direccionController.getDireccionById);
router.put('/:id_usuario', direccionController.updateDireccion);

module.exports = router;
