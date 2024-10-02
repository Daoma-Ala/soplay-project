const createConnection = require('../config/conexion.js');
const Servicio = require('../model/Servicio.js');

class ServicioDao {

    async crear(servicio) {
        const db = await createConnection();
        try {
            const { nombre, descripcion, precio } = servicio;

            const [resultado] = await db.query(
                'INSERT INTO servicios (nombre, descripcion, precio) VALUES (?, ?, ?)',
                [nombre, descripcion, precio]
            );
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear servicio:', error);
            throw new Error('Error al crear servicio');
        } finally {
            await db.end();
        }
    }

    async consultarId(id) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM servicios WHERE id_servicio = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Servicio no encontrado');
            }
            const row = rows[0];
            return new Servicio(row.id_servicio, row.nombre, row.descripcion, row.precio);
        } catch (error) {
            console.error('Error al obtener servicio:', error);
            throw new Error('Error al obtener servicio');
        } finally {
            await db.end();
        }
    }

    async obtenerTodos() {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM servicios');
            return rows.map(row => new Servicio(row.id_servicio, row.nombre, row.descripcion, row.precio));
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw new Error('Error al obtener servicios');
        } finally {
            await db.end();
        }
    }

    async actualizar(servicio) {
        const db = await createConnection();
        try {
            const { id_servicio, nombre, descripcion, precio } = servicio;

            await db.query(
                'UPDATE servicios SET nombre = ?, descripcion = ?, precio = ? WHERE id_servicio = ?',
                [nombre, descripcion, precio, id_servicio]
            );
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
            throw new Error('Error al actualizar servicio');
        } finally {
            await db.end();
        }
    }

    async eliminar(id_servicio) {
        const db = await createConnection();
        try {
            await db.query('DELETE FROM servicios WHERE id_servicio = ?', [id_servicio]);
        } catch (error) {
            console.error('Error al eliminar servicio:', error);
            throw new Error('Error al eliminar servicio');
        } finally {
            await db.end();
        }
    }
}

module.exports = new ServicioDao();

