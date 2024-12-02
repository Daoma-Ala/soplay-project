const CotizacionServicio = require('../service/CotizacionService.js');

exports.addCotizacion = async (req, res) => {
    try {
        const { id_usuario } = req;
        const id_cotizacion = await CotizacionServicio.addCotizacion(id_usuario);
        res.status(201).json({ id_cotizacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo crear la cotizacion", error: error.message });
    }
};

exports.getCotizacionById = async (req, res) => {
    try {
        const id_cotizacion = parseInt(req.params.id);
        if (isNaN(id_cotizacion)) {
            return res.status(400).json({ error: 'ID de la cotización no es válido' });
        }
        const cotizacion = await CotizacionServicio.getCotizacionById(id_cotizacion);

        if (!cotizacion) {
            return res.status(404).json({ error: 'Cotización no encontrada' })
        }
        res.status(201).json(cotizacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo obtener a la cotización", error: error.message });
    }
};

exports.getAllCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await CotizacionServicio.getAllCotizaciones();
        res.status(201).json(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede consultar todas las cotizaciones" });
    }
};

exports.getAllCotizacionesByUsuario = async (req, res) => {
    try {
        const { id_usuario } = req;
        const cotizaciones = await CotizacionServicio.getCotizacionesbyUsuario(id_usuario);
        res.status(201).json(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se puede consultar todas las cotizaciones por usuario" });
    }
}

exports.deleteCotizacion = async (req, res) => {
    try {
        const id_cotizacion = parseInt(req.params.id);
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