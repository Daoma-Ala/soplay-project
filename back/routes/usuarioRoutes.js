const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');

// Rutas
router.post('/', usuarioController.addUsuario);
router.get('/:id', proctectedRoutes, usuarioController.getUsuarioById);
router.get('/', proctectedRoutes, checkRole(['ENCARGADO']), usuarioController.getAllUsuarios);
router.delete('/:id', proctectedRoutes, checkRole(['ENCARGADO']), usuarioController.deleteUsuario);
router.put('/:id', proctectedRoutes, checkRole(['ENCARGADO', 'CLIENTE']), usuarioController.updateUsuario);

module.exports = router;