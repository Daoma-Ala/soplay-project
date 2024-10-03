const UsuarioDao = require('../dao/UsuarioDao.js');
const DireccionDao = require('../dao/DireccionDao.js');
const Usuario = require('../model/Usuario.js');
const Direccion = require('../model/Direccion.js');

class UsuarioService {

    async crearUsuario(data) {
        const {
            correo,
            password,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            tipo,
            sexo,
            telefono,
            direccion
        } = data;
        const usuarioNuevo = new Usuario(null, correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, direccion);
        const id_usuario = await UsuarioDao.crearUsuario(usuarioNuevo);
        if (id_usuario != null) {
            return id_usuario;
        } else {
            DireccionDao.eliminar(id_direccion);
            throw new Error("No se pudo crear el usuario: ID no devuelto.");
        }
    }


    async consultarUsuarioPorId(id) {
        try {
            const usuario = await UsuarioDao.consultarUsuarioPorId(id);
            return usuario;
        } catch (error) {
            console.error('Error en consultar Usuario:', error);
            throw new Error('No se pudo consultar el usuario por ID');
        }

    }
}



module.exports = new UsuarioService();