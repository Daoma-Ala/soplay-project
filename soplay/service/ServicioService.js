const ServicioDao = require('../data/ServicioDao.js');
const Servicio = require('../model/Servicio.js');

class ServicioService {

    async getAllServicios() {
        try {
            return await ServicioDao.getAllServicios();
        } catch (error) {
            console.error('Error en consultar todos los servicios:', error.message);
            throw new Error('No se pudo consultar los servicios');
        }
    }

    async addServicio(servicio) {
        try {
            const { nombre, descripcion, precio, fotos } = servicio;
            const nuevoServicio = new Servicio(null, nombre, descripcion, precio, fotos);
            const id_servicio = await ServicioDao.addServicio(nuevoServicio);
            return id_servicio;
        } catch (error) {
            console.error('Error al crear servicio:', error.message);
            throw new Error('No se pudo crear el servicio');
        }
    }

    async getServicioById(id_servicio) {
        try {
            const servicio = await ServicioDao.getServicioById(id_servicio);
            return servicio;
        } catch (error) {
            console.error('Error al consultar servicio:', error.message);
            throw new Error('No se pudo consultar el servicio por ID');
        }
    }

    async updateServicio(id_servicio, datosServicio) {
        try {
            await ServicioDao.updateServicio({ id_servicio, ...datosServicio });
        } catch (error) {
            console.error('Error al actualizar servicio:', error.message);
            throw new Error('No se pudo actualizar el servicio');
        }
    }

    async deleteServicio(id_servicio) {
        try {
            await ServicioDao.deleteServicio(id_servicio);
        } catch (error) {
            console.error('Error al eliminar servicio:', error.message);
            throw new Error('No se pudo eliminar el servicio');
        }
    }
}

module.exports = new ServicioService();

