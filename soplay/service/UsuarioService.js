const UsuarioDao = require('../dao/UsuarioDao.js');
const DireccionDao = require('../dao/DireccionUsuarioDao.js');
const Usuario = require('../model/Usuario.js');
const Direccion = require('../model/DireccionUsuario.js');

class UsuarioService {

    async crearUsuario(data) {
        const id_direccion = await this.#agregarDireccionUsuario(data.direccion);
        if (id_direccion != null) {
            const usuarioNuevo = new Usuario(null, data.correo, data.password, data.nombres, data.apellido_paterno, data.apellido_materno, data.fecha_nacimiento, data.tipo, data.sexo, data.telefono, id_direccion);
            const id_usuario = await UsuarioDao.crear(usuarioNuevo);
            if (id_usuario != null) {
                return id_usuario;
            } else {
                DireccionDao.eliminar(id_direccion);
                throw new Error("No se pudo crear el usuario: ID no devuelto.");
            }
        } else {
            throw new Error("No se pudo crear la dirección del usuario: ID no devuelto.");
        }
    }


    async consultarUsuarioPorId(id) {

    }

    async #agregarDireccionUsuario(data) {
        const direccionNueva = new Direccion(null, data.calle, data.numero, data.colonia, data.ciudad, data.estado, data.codigo_postal);
        const id_direccion = await DireccionDao.crear(direccionNueva);
        return id_direccion;
    }
}

module.exports = new UsuarioService();