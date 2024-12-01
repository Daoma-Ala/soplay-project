const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');
const proctectedRoutes = require('../middlewares/proctectedRoutes.js');
// Ruta para autenticar y registar
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/protected', proctectedRoutes, authController.protected);
module.exports = router;