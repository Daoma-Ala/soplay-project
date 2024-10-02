const createConnection = require('../config/conexion.js');
const Usuario = require('../model/Usuario.js');
const DireccionDao = require('../dao/DireccionUsuarioDao.js');
class UsuarioDao {

    async crear(usuario) {
        const db = await createConnection();
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
                id_direccion
            } = usuario;

            const [resultado] = await db.query(
                'INSERT INTO usuarios (correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_direccion]
            );
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw new Error('Error al crear usuario');
        } finally {
            await db.end();
        }
    }

    async consultarId(id) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];
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
                row.id_direccion
            );
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw new Error('Error al obtener usuario');
        } finally {
            await db.end();
        }
    }

    async actualizar(usuario) {
        const db = await createConnection();
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
                telefono,
                id_direccion
            } = usuario;

            await db.query(
                'UPDATE usuarios SET correo = ?, password = ?, nombres = ?, apellido_paterno = ?, apellido_materno = ?, fecha_nacimiento = ?, tipo = ?, sexo = ?, telefono = ?, id_direccion = ? WHERE id_usuario = ?',
                [correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_direccion, id_usuario]
            );
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error('Error al actualizar usuario');
        } finally {
            await db.end();
        }
    }

    async eliminar(id_usuario) {
        const db = await createConnection();
        try {
            const id_direccion = (await this.consultarId(id_usuario)).id_direccion;
            await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
            await DireccionDao.eliminar(id_direccion);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw new Error('Error al eliminar usuario');
        } finally {
            await db.end();
        }
    }
}

module.exports = new UsuarioDao();

