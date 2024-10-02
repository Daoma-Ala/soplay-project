const ServicioDao = require('../dao/ServicioDao.js');
const Servicio = require('../model/Servicio.js');

class ServicioService {

    async crearServicio(data) {
        const servicioNuevo = new Servicio(null, data.nombre, data.descripcion, data.precio);
        const id_servicio = await ServicioDao.crear(servicioNuevo);
        return id_servicio;
    }

}

module.exports = new ServicioService();
