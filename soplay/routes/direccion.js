const express = require('express');
const router = express.Router();
const DireccionController = require('../controller/DireccionController.js');

// Rutas
router.post('/', DireccionController.addDireccion);
router.get('/:id', DireccionController.getDireccionById);
router.put('/:id_usuario', DireccionController.updateDireccion);

module.exports = router;
