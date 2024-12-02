const CotizacionServicioDao = require('../data/CotizacionDetalladaDao.js');
const CotizacionServicio = require('../model/CotizacionServicio.js');
const ServicioDAO = require('../data/ServicioDao.js');


class CotizacionDetalladaService {

    async addCotizacionDetallada(data) {
        const { id_cotizacion, id_servicio, cantidad } = data;

        const cotizacionServicio = new CotizacionServicio(id_cotizacion, id_servicio, cantidad, null);
        const idResultado = await CotizacionServicioDao.getCotizacionDetalladaById(id_cotizacion, id_servicio);
        if (idResultado === null) {
            await CotizacionServicioDao.addCotizacionDetallada(cotizacionServicio);
        } else {
            await CotizacionServicioDao.updateCotizacionDetallada(cotizacionServicio);
        }
    }

    async getCotizacionDetalladaById(data) {
        const { id_cotizacion, id_servicio } = data;
        console.log(`servicio 2-.....Buscando cotización con id_cotizacion: ${id_cotizacion}, id_servicio: ${id_servicio}`);
        const cotizacionServicio = await CotizacionServicioDao.getCotizacionDetalladaById(id_cotizacion, id_servicio);
        if (!cotizacionServicio) {
            throw new Error('Cotización Detallada no encontrada');
        }
        return cotizacionServicio;
    }

    async getAllByCotizacionId(data) {
        const { id_cotizacion } = data;

        const cotizacionesDetalladas = await CotizacionServicioDao.getAllByCotizacionId(id_cotizacion);
        if (!cotizacionesDetalladas || cotizacionesDetalladas.length === 0) {
            throw new Error('Cotizaciones detalladas no encontradas');
        }

        /*
        const detallesConServicios = await Promise.all(
            cotizacionesDetalladas.map(async (detalle) => {
                const servicio = await ServicioDAO.getServicioById(detalle.id_servicio);

                if (!servicio) {
                    console.warn(`Servicio con id ${detalle.id_servicio} no encontrado.`);
                }

                return {
                    ...detalle,
                    servicio: servicio || null,
                };
            })
        );
        */

        return cotizacionesDetalladas;
    }


    async deleteCotizacionDetallada(data) {
        const { id_cotizacion, id_servicio } = data;
        console.log(`servicio....Buscando cotización con id_cotizacion: ${id_cotizacion}, id_servicio: ${id_servicio}`);
        const cotizacionDetalladaExistente = await this.getCotizacionDetalladaById(data);
        if (!cotizacionDetalladaExistente) {
            throw new Error('No se puede Eliminar. Cotización Detallada no encontrada');
        }
        await CotizacionServicioDao.deleteCotizacionDetallada(id_cotizacion, id_servicio);
    }


}

module.exports = new CotizacionDetalladaService();