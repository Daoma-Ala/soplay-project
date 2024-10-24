const CotizacionServicio = require('../service/CotizacionService.js');

exports.crearCotizacion = async (req, res) => {
    try{
        const cotizacionData = req.body;
        const id_cotizacion = await CotizacionServicio.crearCotizacion(cotizacionData);
        res.status(201).json({id_cotizacion});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "No se pudo crear al usuario", error: error.message}); 
    }
};

exports.obtenerCotizacionPorId = async (req, res) => {
    try{
        const id_cotizacion = parseInt(req.param.id);
        if(isNaN(id_cotizacion)){
            return res.status(400).json({error: 'ID de la cotización no válido'});
        }
        const cotizacion = await CotizacionServicio.obtenerCotizacionPorId(id_cotizacion);
        
        if(!cotizacion){
            return res.status(404).json({error: 'Cotización no encontrada'})
        }
        res.json(cotizacion);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "No se pudo obtener a la cotización", error: error.message });
    }
};

exports.obtenerTodasLasCotizaciones = async (req, res) => {
    try{
        const cotizaciones = await CotizacionServicio.obtenerTodasLasCotizaciones();
        res.json(cotizaciones);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "No se puede consultar todas las cotizaciones" });
    }
};

exports.eliminarCotizacion = async (req, res) => {
    try{
        const id_cotizacion = parseInt(req.param.id);
        if(isNaN(id_cotizacion)){
            return res.status(400).json({error: 'ID de la cotización no válido'});
        }
        await CotizacionServicio.eliminarCotizacion(id_cotizacion);
        res.status(201).json({message: 'Cotización eliminada'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "No se puede eliminar a la cotización", error: error.message});
    }
};