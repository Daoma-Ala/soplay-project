const CotizacionServicio = require('../service/CotizacionService.js');

exports.addCotizacion = async (req, res) => {
    try {
        const cotizacionData = req.body;
        const id_cotizacion = await CotizacionServicio.addCotizacion(cotizacionData);
        res.status(201).json({ id_cotizacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo crear al usuario", error: error.message });
    }
};

exports.getCotizacionById = async (req, res) => {
    try {
        const id_cotizacion = parseInt(req.param.id);
        if (isNaN(id_cotizacion)) {
            return res.status(400).json({ error: 'ID de la cotización no válido' });
        }
        const cotizacion = await CotizacionServicio.getCotizacionById(id_cotizacion);

        if (!cotizacion) {
            return res.status(404).json({ error: 'Cotización no encontrada' })
        }
        res.json(cotizacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo obtener a la cotización", error: error.message });
    }
};

exports.getAllCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await CotizacionServicio.getAllCotizaciones();
        res.json(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede consultar todas las cotizaciones" });
    }
};

exports.getAllCotizacionesByUsuario = async (req, res) => {
    try {
        const id_usuario = parseInt(req.param.id_usuario);
        const cotizaciones = await CotizacionServicio.getCotizacionesbyUsuario(id_usuario);
        res.json(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede consultar todas las cotizaciones por usuario" });
    }
}

exports.deleteCotizacion = async (req, res) => {
    try {
        const id_cotizacion = parseInt(req.param.id);
        if (isNaN(id_cotizacion)) {
            return res.status(400).json({ error: 'ID de la cotización no válido' });
        }
        await CotizacionServicio.deleteCotizacion(id_cotizacion);
        res.status(201).json({ message: 'Cotización eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede eliminar a la cotización", error: error.message });
    }
};