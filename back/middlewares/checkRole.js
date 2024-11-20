const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        const { rol } = req;
        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
        }
        next();
    };
}

module.exports = checkRole;