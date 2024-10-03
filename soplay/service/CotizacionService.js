const CotizacionDao = require('../dao/CotizacionDao.js');
const Cotizacion = require('../model/Cotizacion.js');
const CotizacionServicioDao = require('../dao/CotizacionServicioDao.js');
const CotizacionServicio = require('../model/CotizacionServicio.js');


class CotizacionService {

    async crearCotizacion(data) {
        const { serie, id_usuario, cotizacion_servicios } = data;
        const nuevaCotizacion = new Cotizacion(null, serie, null, null, id_usuario, cotizacion_servicios);
        const idCotizacion = await CotizacionDao.crearCotizacion(nuevaCotizacion);
        return idCotizacion;
    }

    async obtenerCotizacionPorId(id) {
        const cotizacion = await CotizacionDao.consultarId(id);
        if (!cotizacion) {
            throw new Error('Cotización no encontrada');
        }
        return cotizacion;
    }



    async obtenerCotizacionesPorUsuario(id_usuario) {
        const cotizaciones = await CotizacionDao.obtenerCotizacionesUsuario(id_usuario);
        if (cotizaciones.length === 0) {
            throw new Error('No se encontraron cotizaciones para el usuario');
        }
        return cotizaciones;
    }

    async obtenerTodasLasCotizaciones() {
        const cotizaciones = await CotizacionDao.obtenerTodos();
        return cotizaciones;
    }

    async eliminarCotizacion(id) {
        const cotizacionExistente = await this.obtenerCotizacionPorId(id);
        if (!cotizacionExistente) {
            throw new Error('No se puede eliminar. Cotización no encontrada');
        }
        await CotizacionDao.eliminar(id);
    }

    async agregarServicio(data) {
        const cotizacionServicio = new CotizacionServicio(data.id_cotizacion, data.id_servicio, data.cantidad, null);
        await CotizacionServicioDao.actualizarCotizacionServicio(cotizacionServicio);
    }
}

module.exports = new CotizacionService();