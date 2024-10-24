const CotizacionServicioDao = require('../data/CotizacionDetalladaDao.js');
const CotizacionServicio = require('../model/CotizacionServicio.js');


class CotizacionDetalladaService {

    async addCotizacionDetallada(data) {
        const { id_cotizacion, id_servicio, cantidad } = data;
        const cotizacionServicio = new CotizacionServicio(id_cotizacion, id_servicio, cantidad, null);
        const idResultado = await CotizacionServicioDao.getCotizacionDetalladaById(data.id_cotizacion, data.id_servicio);
        if (idResultado == null) {
            await CotizacionServicioDao.addCotizacionDetallada(cotizacionServicio);
        } else {
            await CotizacionServicioDao.updateCotizacionDetallada(cotizacionServicio);
        }
    }

    async getCotizacionDetalladaById(data) {
        const { id_cotizacion, id_servicio } = data;
        const cotizacionServicio = await CotizacionServicioDao.getCotizacionDetalladaById(id_cotizacion, id_servicio);
        if (!cotizacionServicio) {
            throw new Error('Cotización Detallada no encontrada');
        }
        return cotizacionServicio;
    }

    async getAllByCotizacionId(data) {
        const { id_cotizacion } = data;
        const cotizacionesDetalladas = await CotizacionServicioDao.getAllByCotizacionId(id_cotizacion);
        if (!cotizacionesDetalladas) {
            if (!cotizacionServicio) {
                throw new Error('Cotizaciones Detalladas no encontradas');
            }
        }
        return cotizacionesDetalladas;
    }

    async deleteCotizacionDetallada(data) {
        const { id_cotizacion, id_servicio } = data;
        const cotizacionDetalladaExistente = await this.getCotizacionDetalladaById(id_cotizacion, id_servicio);
        if (!cotizacionDetalladaExistente) {
            throw new Error('No se puede Eliminar. Cotización Detallada no encontrada');
        }
        await CotizacionServicioDao.deleteCotizacionDetallada(id_cotizacion, id_servicio);
    }


}

module.exports = new CotizacionDetalladaService();