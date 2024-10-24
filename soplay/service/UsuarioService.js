const UsuarioDao = require('../data/UsuarioDao.js');
const Usuario = require('../model/Usuario.js');


class UsuarioService {

    async getAllUsuarios() {
        try {
            return await UsuarioDao.getAllUsuarios();
        } catch (error) {
            console.error('Error en consultar todos los Usuarios:', error.message);
            throw new Error('No se pudo consultar el usuario por ID');
        }
    }

    async addUsuario(usuario) {
        try {
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
            } = usuario;

            const usuarioNuevo = new Usuario(null, correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, direccion);
            const id_usuario = await UsuarioDao.addUsuario(usuarioNuevo);

            return id_usuario;
        } catch (error) {
            console.error("Error en el servicio:", error);
            throw new Error('No se pudo crear el usuario: ' + error.message);
        };
    }

    async getUsuarioById(id_usuario) {
        try {
            const usuario = await UsuarioDao.getUsuarioById(id_usuario);
            return usuario;
        } catch (error) {
            console.error('Error en consultar Usuario:', error);
            throw new Error('No se pudo consultar el usuario por ID');
        }

    }

    async updateUsuario(id_usuario, datosUsuario) {
        try {
            await UsuarioDao.updateUsuario(id_usuario, datosUsuario);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error.message);
            throw new Error('No se pudo actualizar el usuario por ID');
        }
    }

    async deleteUsuario(id_usuario) {
        try {
            await UsuarioDao.deleteUsuario(id_usuario);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error.message);
            throw new Error('No se pudo eliminar el usuario por ID');
        }
    }

    async loginUsuario(correo, password) {
        try {
            return await UsuarioDao.loginUsuario(correo, password);
        } catch (error) {
            console.error('Error al logear al usuario:', error.message);
            throw new Error('No se pudo logear al usuario por credenciales');
        }
    }

}


module.exports = new UsuarioService();