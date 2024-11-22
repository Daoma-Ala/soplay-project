const checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        const { rol } = req;
        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }
        next();
    };
}

module.exports = checkRole;