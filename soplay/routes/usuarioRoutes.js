const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/UsuarioController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');

// Rutas
router.post('/', usuarioController.addUsuario);
router.get('/:id', proctectedRoutes, usuarioController.getUsuarioById);
router.get('/', usuarioController.getAllUsuarios);
router.delete('/:id', usuarioController.deleteUsuario);
router.put('/:id', usuarioController.updateUsuario);

module.exports = router;