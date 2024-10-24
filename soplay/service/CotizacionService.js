const CotizacionDao = require('../data/CotizacionDao.js');
const Cotizacion = require('../model/Cotizacion.js');

class CotizacionService {

    async addCotizacion(data) {
        const { serie, id_usuario, cotizacion_servicios } = data;
        const nuevaCotizacion = new Cotizacion(null, serie, null, null, id_usuario, cotizacion_servicios);
        const idCotizacion = await CotizacionDao.addCotizacion(nuevaCotizacion);
        return idCotizacion;
    }

    async getCotizacionById(id) {
        const cotizacion = await CotizacionDao.getCotizacionById(id);
        if (!cotizacion) {
            throw new Error('Cotización no encontrada');
        }
        return cotizacion;
    }

    async getCotizacionesbyUsuario(id_usuario) {
        const cotizaciones = await CotizacionDao.getCotizacionesbyUsuario(id_usuario);
        if (cotizaciones.length === 0) {
            throw new Error('No se encontraron cotizaciones para el usuario');
        }
        return cotizaciones;
    }

    async getAllCotizaciones() {
        const cotizaciones = await CotizacionDao.getAllCotizaciones();
        return cotizaciones;
    }

    async deleteCotizacion(id) {
        const cotizacionExistente = await this.getCotizacionById(id);
        if (!cotizacionExistente) {
            throw new Error('No se puede eliminar. Cotización no encontrada');
        }
        await CotizacionDao.deleteCotizacion(id);
    }

}

module.exports = new CotizacionService();