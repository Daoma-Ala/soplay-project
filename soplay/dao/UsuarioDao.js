const createConnection = require('../config/conexion.js');
const Usuario = require('../model/Usuario.js');
const DireccionDao = require('./DireccionDao.js');

class UsuarioDao {

    async crearUsuario(usuario) {
        const connection = await createConnection();
        try {
            await connection.beginTransaction();
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


            const id_direccion = await DireccionDao.crearDireccion(direccion, connection);

            const [resultado] = await connection.query(
                'INSERT INTO usuarios (correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_direccion]
            );

            await connection.commit();

            return resultado.insertId;
        } catch (error) {
            await connection.rollback();
            console.error('Error al crear usuario:', error);
            throw new Error('Error al crear usuario');
        } finally {
            await connection.end();
        }
    }

    async consultarUsuarioPorId(id) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];

            const direccion = await DireccionDao.consultarDireccionPorId(row.id_direccion);

            return new Usuario(
                row.id_usuario,
                row.correo,
                row.password,
                row.nombres,
                row.apellido_paterno,
                row.apellido_materno,
                row.fecha_nacimiento,
                row.tipo,
                row.sexo,
                row.telefono,
                direccion
            );
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw new Error('Error al obtener usuario');
        } finally {
            await connection.end();
        }
    }

    async actualizarUsuario(usuario) {
        const connection = await createConnection();
        try {
            const {
                id_usuario,
                correo,
                password,
                nombres,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                tipo,
                sexo,
                telefono
            } = usuario;

            await connection.query(
                'UPDATE usuarios SET correo = ?, password = ?, nombres = ?, apellido_paterno = ?, apellido_materno = ?, fecha_nacimiento = ?, tipo = ?, sexo = ?, telefono = ? WHERE id_usuario = ?',
                [correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_usuario]
            );
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error('Error al actualizar usuario');
        } finally {
            await connection.end();
        }
    }

    async eliminar(id_usuario) {
        const connection = await createConnection();
        try {
            await connection.beginTransaction();

            const usuario = await this.consultarUsuarioPorId(id_usuario);

            await sDireccionDao.eliminarDireccion(usuario.direccion.id_direccion);

            await connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.error('Error al eliminar usuario:', error);
            throw new Error('Error al eliminar usuario');
        } finally {
            await connection.end();
        }
    }
}

module.exports = new UsuarioDao();

