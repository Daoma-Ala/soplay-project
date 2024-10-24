const DireccionService = require('../service/DireccionService.js');

exports.getDireccionById = async (req, res) => {
    try {
        const id_direccion = parseInt(req.params.id);
        if (isNaN(id_direccion)) {
            return res.status(400).json({ error: 'ID de la dirección no válido' });
        }
        const direccion = await DireccionService.getDireccionById(id_direccion);

        if (!direccion) {
            return res.status(404).json({ error: 'Dirección no encontrada' });
        }
        res.json(direccion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo obtener la dirección", error: error.message });
    }
};

exports.addDireccion = async (req, res) => {
    try {
        const direccionData = req.body;
        const id_direccion = await DireccionService.addDireccion(direccionData);
        res.status(201).json({ id_direccion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo agregar la dirección", error: error.message });
    }
};

exports.updateDireccion = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id_usuario);
        if (isNaN(id_usuario)) {
            return res.status(400).json({ error: 'ID del usuario no válido' });
        }
        const direccionData = req.body;
        await DireccionService.updateDireccion(id_usuario, direccionData);
        res.status(201).json({ message: 'Dirección actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo actualizar la dirección", error: error.message });
    }
};

