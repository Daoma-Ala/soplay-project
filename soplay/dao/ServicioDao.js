const createConnection = require('../config/conexion.js');
const Servicio = require('../model/Servicio.js');
const Foto = require('../model/Foto.js');
const FotoDao = require('../dao/FotoDao.js');

class ServicioDao {

    async crearServicio(servicio) {
        const connection = await createConnection();
        try {

            connection.beginTransaction();
            const { nombre, descripcion, precio, fotos } = servicio;

            const [resultado] = await connection.query(
                'INSERT INTO servicios (nombre, descripcion, precio) VALUES (?, ?, ?)',
                [nombre, descripcion, precio]
            );

            const servicioId = resultado.insertId;
            for (const foto of fotos) {
                foto.id_servicio = servicioId;
                await FotoDao.crearFoto(foto, connection);
            }

            connection.commit();
            return resultado.insertId;
        } catch (error) {
            connection.rollback();
            console.error('Error al crear servicio:', error);
            throw new Error('Error al crear servicio');
        } finally {
            await connection.end();
        }
    }

    async consultarId(id) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM servicios WHERE id_servicio = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Servicio no encontrado');
            }
            const row = rows[0];
            return new Servicio(row.id_servicio, row.nombre, row.descripcion, row.precio);
        } catch (error) {
            console.error('Error al obtener servicio:', error);
            throw new Error('Error al obtener servicio');
        } finally {
            await connection.end();
        }
    }

    async consultarTodosServicios() {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM servicios');
            const serviciosConFotos = await Promise.all(rows.map(async row => {
                const fotos = await FotoDao.obtenerFotosServicio(row.id_servicio);
                return new Servicio(row.id_servicio, row.nombre, row.descripcion, row.precio, fotos);
            }));
            return serviciosConFotos;
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw new Error('Error al obtener servicios');
        } finally {
            await connection.end();
        }
    }

    async actualizar(servicio) {
        const connection = await createConnection();
        try {
            const { id_servicio, nombre, descripcion, precio } = servicio;

            await connection.query(
                'UPDATE servicios SET nombre = ?, descripcion = ?, precio = ? WHERE id_servicio = ?',
                [nombre, descripcion, precio, id_servicio]
            );
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
            throw new Error('Error al actualizar servicio');
        } finally {
            await connection.end();
        }
    }

    async eliminar(id_servicio) {
        const connection = await createConnection();
        try {
            await connection.query('DELETE FROM servicios WHERE id_servicio = ?', [id_servicio]);
        } catch (error) {
            console.error('Error al eliminar servicio:', error);
            throw new Error('Error al eliminar servicio');
        } finally {
            await connection.end();
        }
    }
}

module.exports = new ServicioDao();

