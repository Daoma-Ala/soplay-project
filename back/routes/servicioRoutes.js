const express = require('express');
const router = express.Router();
const servicioController = require('../controller/servicioController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
const checkRole = require('../middlewares/checkRole.js');
const upload = require('../config/multerConfig.js');
// Rutas

//router.post('/', proctectedRoutes, checkRole(['ENCARGADO']),upload.single('foto'), servicioController.addServicio);
router.post('/',upload.single('foto'), servicioController.addServicio);

//router.get('/:id', proctectedRoutes, servicioController.getServicioById);
router.get('/:id', servicioController.getServicioById);

router.get('/', servicioController.getAllServicios);

//router.delete('/:id', proctectedRoutes, checkRole(['ENCARGADO']), servicioController.deleteServicio);
router.delete('/:id', servicioController.deleteServicio);
router.put('/:id', proctectedRoutes, checkRole(['ENCARGADO']), servicioController.updateServicio);

module.exports = router;
