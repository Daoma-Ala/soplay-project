const ServicioDao = require('../dao/ServicioDao.js');
const Servicio = require('../model/Servicio.js');

class ServicioService {

    async crearServicio(data) {
        const { nombre, descripcion, precio, fotos } = data;
        const servicioNuevo = new Servicio(null, nombre, descripcion, precio, fotos);
        const id_servicio = await ServicioDao.crearServicio(servicioNuevo);
        return id_servicio;
    }

    async consultarTodosServicios() {
        return await ServicioDao.consultarTodosServicios();
    }

}

module.exports = new ServicioService();
