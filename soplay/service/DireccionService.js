const DireccionDao = require('../data/DireccionDao.js');
const Direccion = require('../model/Direccion.js');

class DireccionService {

    async getDireccionById(id_direccion) {
        try {
            const direccion = await DireccionDao.getDireccionById(id_direccion);
            return direccion;
        } catch (error) {
            console.error('Error al consultar dirección:', error.message);
            throw new Error('No se pudo consultar la dirección por ID');
        }
    }

    async addDireccion(direccion) {
        try {
            const { calle, numero, colonia, ciudad, estado, codigo_postal, id_usuario } = direccion;
            const nuevaDireccion = new Direccion(null, calle, numero, colonia, ciudad, estado, codigo_postal, id_usuario);
            const id_direccion = await DireccionDao.addDireccion(nuevaDireccion);
            return id_direccion;
        } catch (error) {
            console.error('Error al crear dirección:', error.message);
            throw new Error('No se pudo crear la dirección');
        }
    }

    async updateDireccion(id_usuario, datosDireccion) {
        try {
            await DireccionDao.updateDireccion(id_usuario, datosDireccion);
        } catch (error) {
            console.error('Error al actualizar dirección:', error.message);
            throw new Error('No se pudo actualizar la dirección');
        }
    }
}

module.exports = new DireccionService();
