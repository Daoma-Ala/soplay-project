const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController.js');

// Rutas
router.post('/', UsuarioController.addUsuario);
router.get('/:id', UsuarioController.getUsuarioById);
router.get('/', UsuarioController.getAllUsuarios);
router.delete('/:id', UsuarioController.deleteUsuario);
router.put('/:id', UsuarioController.updateUsuario);

module.exports = router;