const express = require('express');
const router = express.Router();
const direccionController = require('../controller/direccionController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');

// Rutas
router.post('/', proctectedRoutes, direccionController.addDireccion);
router.get('/:id', proctectedRoutes, direccionController.getDireccionById);
router.put('/:id_usuario', proctectedRoutes, direccionController.updateDireccion);

module.exports = router;
