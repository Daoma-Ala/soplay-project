const createConnection = require('../config/conexion.js');
const Cotizacion = require('../dominio/Cotizacion.js');

class CotizacionDao {

    async crear(cotizacion) {
        const db = await createConnection();
        try {
            const { serie, id_usuario } = cotizacion;
            const [resultado] = await db.query(
                'INSERT INTO cotizaciones (serie, id_usuario) VALUES (?, ?)',
                [serie, id_usuario]
            );
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear cotización:', error);
            throw new Error('Error al crear cotización');
        } finally {
            await db.end();
        }
    }

    async consultarId(id) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM cotizaciones WHERE id_cotizacion = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Cotización no encontrada');
            }
            const row = rows[0];
            return new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.id_usuario);
        } catch (error) {
            console.error('Error al obtener cotización:', error);
            throw new Error('Error al obtener cotización');
        } finally {
            await db.end();
        }
    }

    async actualizar(cotizacion) {
        const db = await createConnection();
        try {
            const { id_cotizacion, serie, id_usuario } = cotizacion;

            await db.query(
                'UPDATE cotizaciones SET serie = ?, id_usuario = ? WHERE id_cotizacion = ?',
                [serie, id_usuario, id_cotizacion]
            );
        } catch (error) {
            console.error('Error al actualizar cotización:', error);
            throw new Error('Error al actualizar cotización');
        } finally {
            await db.end();
        }
    }

    async obtenerCotizacionesUsuario(id_usuario) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM cotizaciones WHERE id_usuario = ?', [id_usuario]);
            return rows.map(row => new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.id_usuario));
        } catch (error) {
            console.error('Error al obtener cotizaciones por usuario:', error);
            throw new Error('Error al obtener cotizaciones por usuario');
        } finally {
            await db.end();
        }
    }

    async obtenerTodos() {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM cotizaciones');
            return rows.map(row => new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.id_usuario));
        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
            throw new Error('Error al obtener cotizaciones');
        } finally {
            await db.end();
        }
    }

    async eliminar(id) {
        const db = await createConnection();
        try {
            await db.query('DELETE FROM cotizaciones WHERE id_cotizacion = ?', [id]);
        } catch (error) {
            console.error('Error al eliminar cotización:', error);
            throw new Error('Error al eliminar cotización');
        } finally {
            await db.end();
        }
    }
}

module.exports = new CotizacionDao();