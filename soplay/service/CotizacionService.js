const CotizacionDao = require('../dao/CotizacionDao.js');
const Cotizacion = require('../model/Cotizacion.js');
const CotizacionServicioDao = require('../dao/CotizacionServicioDao.js');
const CotizacionServicio = require('../model/CotizacionServicio.js');


class CotizacionService {

    async crearCotizacion(data) {
        const nuevaCotizacion = new Cotizacion(null, data.serie, null, null, data.id_usuario);
        const idCotizacion = await CotizacionDao.crear(nuevaCotizacion);
        return idCotizacion;
    }

    async obtenerCotizacionPorId(id) {
        const cotizacion = await CotizacionDao.consultarId(id);
        if (!cotizacion) {
            throw new Error('Cotización no encontrada');
        }
        return cotizacion;
    }

    async actualizarCotizacion(data) {
        const cotizacionExistente = await this.obtenerCotizacionPorId(data.id_cotizacion);
        if (!cotizacionExistente) {
            throw new Error('No se puede actualizar. Cotización no encontrada');
        }
        cotizacionExistente.serie = data.serie || cotizacionExistente.serie;
        cotizacionExistente.id_usuario = data.id_usuario || cotizacionExistente.id_usuario;

        await CotizacionDao.actualizar(cotizacionExistente);
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
        const cotizacionServicio = await CotizacionServicioDao.consultarId(data.id_cotizacion, data.id_servicio);
        if (!cotizacionServicio) {
           await CotizacionServicioDao.crear(new CotizacionServicio(data.id_cotizacion, data.id_servicio, data.cantidad));
        }
        CotizacionServicioDao.actualizar(data);
    }
}

module.exports = new CotizacionService();