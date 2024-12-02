const CotizacionDetalladaService = require('../service/CotizacionDetalladaService.js');

exports.addCotizacionDetallada = async (req, res) => {
    try {
        const data = req.body;
        await CotizacionDetalladaService.addCotizacionDetallada(data);
        res.status(201).json({ message: 'Cotización detallada agregada/actualizada con éxito' });
    } catch (error) {
        console.error('Error al agregar/actualizar la cotización detallada:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};


exports.getCotizacionDetalladaById = async (req, res) => {
    try {
        const { id_cotizacion, id_servicio } = req.params;
        const cotizacionDetallada = await CotizacionDetalladaService.getCotizacionDetalladaById({ id_cotizacion, id_servicio });
        res.status(200).json(cotizacionDetallada);
    } catch (error) {
        console.error('Error al obtener la cotización detallada:', error);
        res.status(404).json({ error: 'Cotización detallada no encontrada' });
    }
};

exports.getAllByCotizacionId = async (req, res) => {
    try {
        const { id_cotizacion } = req.params;
        const cotizacionesDetalladas = await CotizacionDetalladaService.getAllByCotizacionId({ id_cotizacion });

        res.status(200).json(cotizacionesDetalladas);
    } catch (error) {
        console.error('Error al obtener las cotizaciones detalladas:', error);
        res.status(500).json({ error: 'Error al obtener las cotizaciones detalladas.' });
    }
};


exports.deleteCotizacionDetallada = async (req, res) => {
    try {
        const { id_cotizacion, id_servicio } = req.params;
        console.log(`controlador...Buscando cotización con id_cotizacion: ${id_cotizacion}, id_servicio: ${id_servicio}`);
        await CotizacionDetalladaService.deleteCotizacionDetallada({ id_cotizacion, id_servicio });
        res.status(200).json({ message: 'Cotización detallada eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la cotización detallada:', error);
        res.status(404).json({ error: 'No se pudo eliminar. Cotización detallada no encontrada' });
    }
};