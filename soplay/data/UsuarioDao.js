const createConnection = require('../config/conexion.js');
const Usuario = require('../model/Usuario.js');
const DireccionDao = require('./DireccionDao.js');

class UsuarioDao {

    async getAllUsuarios() {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM usuarios');
            return rows;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw new Error('Error al obtener todos los usuarios');
        } finally {
            await connection.end();
        }
    }

    async addUsuario(usuario) {
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

            const [resultado] = await connection.query(
                'INSERT INTO usuarios (correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono]
            );

            const id_usuario = resultado.insertId;
            direccion.id_usuario = id_usuario;
            await DireccionDao.addDireccion(direccion, connection);
            await connection.commit();

            return id_usuario;
        } catch (error) {
            await connection.rollback();
            console.error('Error al crear usuario:', error);
            throw new Error('Error al crear usuario ' + error.message);
        } finally {
            await connection.end();
        }
    }

    async getUsuarioById(id_usuario) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const row = rows[0];

            const direccion = await DireccionDao.getDireccionById(row.id_usuario);

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

    async updateUsuario(id_usuario, datosUsuario) {
        const connection = await createConnection();
        try {
            const usuario = await this.getUsuarioById(id_usuario);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            const campos = Object.keys(datosUsuario);
            const valores = Object.values(datosUsuario);

            if (campos.length === 0) {
                throw new Error('No se proporcionaron campos para actualizar');
            }

            if (datosUsuario.direccion) {
                await DireccionDao.updateDireccion(id_usuario, datosUsuario.direccion);
                const index = campos.indexOf('direccion');
                if (index !== -1) {
                    campos.splice(index, 1);
                    valores.splice(index, 1);
                }
            }

            if (campos.length > 0) {
                const setClause = campos.map(campo => `${campo} = ?`).join(', ');
                valores.push(id_usuario);
                const query = `UPDATE usuarios SET ${setClause} WHERE id_usuario = ?`;
                await connection.query(query, valores);
            }

        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error('Error al actualizar usuario');
        } finally {
            await connection.end();
        }
    }

    async deleteUsuario(id_usuario) {
        const connection = await createConnection();
        try {
            const usuario = await this.getUsuarioById(id_usuario);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            await connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
            await connection.commit();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            await connection.rollback();
            throw new Error('Error al eliminar usuario: ' + error.message);
        } finally {
            await connection.end();
        }
    }
}

module.exports = new UsuarioDao();

