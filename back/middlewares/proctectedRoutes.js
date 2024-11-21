const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware para verificar el token en rutas protegidas
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
 
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);
        req.id_usuario = decoded.userId;
        req.rol = decoded.rol;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = verifyToken;
