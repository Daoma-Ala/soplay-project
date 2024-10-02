const createConnection = require('../config/conexion.js');
const CotizacionServicio = require('../model/CotizacionServicio.js');

class CotizacionServicioDao {

    async crear(cotizacionServicio) {
        const db = await createConnection();
        try {
            const { id_cotizacion, id_servicio, cantidad } = cotizacionServicio;

            const [resultado] = await db.query(
                'INSERT INTO cotizaciones_servicios (id_cotizacion, id_servicio, cantidad) VALUES (?, ?, ?)',
                [id_cotizacion, id_servicio, cantidad]
            );
        } catch (error) {
            console.error('Error al crear cotización-servicio:', error);
            throw new Error('Error al crear cotización-servicio');
        } finally {
            await db.end();
        }
    }

    async consultarId(id_cotizacion, id_servicio) {
        const db = await createConnection();
        try {
            const [rows] = await db.query(
                'SELECT * FROM cotizaciones_servicios WHERE id_cotizacion = ? AND id_servicio = ?',
                [id_cotizacion, id_servicio]
            );
            if (rows.length === 0) {
                throw new Error('Cotización-Servicio no encontrada');
            }
            const row = rows[0];
            return new CotizacionServicio(row.id_cotizacion, row.id_servicio, row.cantidad, row.sub_total);
        } catch (error) {
            console.error('Error al obtener cotización-servicio:', error);
            throw new Error('Error al obtener cotización-servicio');
        } finally {
            await db.end();
        }
    }

    async obtenerPorCotizacionId(id_cotizacion) {
        const db = await createConnection();
        try {
            const [rows] = await db.query(
                'SELECT * FROM cotizaciones_servicios WHERE id_cotizacion = ?',
                [id_cotizacion]
            );
            return rows.map(row => new CotizacionServicio(row.id_cotizacion, row.id_servicio, row.cantidad, row.sub_total));
        } catch (error) {
            console.error('Error al obtener servicios por cotización:', error);
            throw new Error('Error al obtener servicios por cotización');
        } finally {
            await db.end();
        }
    }

    async actualizar(cotizacionServicio) {
        const db = await createConnection();
        try {
            const { id_cotizacion, id_servicio, cantidad, sub_total } = cotizacionServicio;

            await db.query(
                'UPDATE cotizaciones_servicios SET cantidad = ? WHERE id_cotizacion = ? AND id_servicio = ?',
                [cantidad, id_cotizacion, id_servicio]
            );
        } catch (error) {
            console.error('Error al actualizar cotización-servicio:', error);
            throw new Error('Error al actualizar cotización-servicio');
        } finally {
            await db.end();
        }
    }

    async eliminar(id_cotizacion, id_servicio) {
        const db = await createConnection();
        try {
            await db.query('DELETE FROM cotizaciones_servicios WHERE id_cotizacion = ? AND id_servicio = ?', [id_cotizacion, id_servicio]);
        } catch (error) {
            console.error('Error al eliminar cotización-servicio:', error);
            throw new Error('Error al eliminar cotización-servicio');
        } finally {
            await db.end();
        }
    }
}

module.exports = new CotizacionServicioDao();