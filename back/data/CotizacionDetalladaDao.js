const createConnection = require('../config/conexion.js');
const CotizacionServicio = require('../model/CotizacionServicio.js');

class CotizacionServicioDao {

    async addCotizacionDetallada(cotizacionServicio) {
        const connection = await createConnection();
        try {
            const { id_cotizacion, id_servicio, cantidad } = cotizacionServicio;

            const [resultado] = await connection.query(
                'INSERT INTO cotizaciones_servicios (id_cotizacion, id_servicio, cantidad) VALUES (?, ?, ?)',
                [id_cotizacion, id_servicio, cantidad]
            );
        } catch (error) {
            console.error('Error al crear cotización-servicio:', error);
            throw new Error('Error al crear cotización-servicio');
        } finally {
            await connection.end();
        }
    }

    async addCotizacionDetalladaCreate(cotizacionServicio, connection) {
        try {
            const { id_cotizacion, id_servicio, cantidad } = cotizacionServicio;
            const [resultado] = await connection.query(
                'INSERT INTO cotizaciones_servicios (id_cotizacion, id_servicio, cantidad) VALUES (?, ?, ?)',
                [id_cotizacion, id_servicio, cantidad]
            );
        } catch (error) {
            console.error('Error al crear cotización-servicio:', error);
            throw new Error('Error al crear cotización-servicio');
        } 
    }

    async getCotizacionDetalladaById(id_cotizacion, id_servicio) {
        const connection = await createConnection();
        try {
            console.log(`dao buscar....Buscando cotización con id_cotizacion: ${id_cotizacion}, id_servicio: ${id_servicio}`);

            const [rows] = await connection.query(
                'SELECT * FROM cotizaciones_servicios WHERE id_cotizacion = ? AND id_servicio = ?',
                [id_cotizacion, id_servicio]
            );
            if (rows.length === 0) {

                return null;
            }
            const row = rows[0];
            return new CotizacionServicio(row.id_cotizacion, row.id_servicio, row.cantidad, row.sub_total);
        } catch (error) {
            console.error('Error al obtener cotización-servicio:', error);
            throw new Error('Error al obtener cotización-servicio');
        } finally {
            await connection.end();
        }
    }

    async getAllByCotizacionId(id_cotizacion) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query(
                'SELECT * FROM cotizaciones_servicios WHERE id_cotizacion = ?',
                [id_cotizacion]
            );
            return rows.map(row => new CotizacionServicio(row.id_cotizacion, row.id_servicio, row.cantidad, row.sub_total));
        } catch (error) {
            console.error('Error al obtener servicios por cotización:', error);
            throw new Error('Error al obtener servicios por cotización');
        } finally {
            await connection.end();
        }
    }

    async updateCotizacionDetallada(cotizacionServicio) {
        const connection = await createConnection();
        try {
            const { id_cotizacion, servicio, cantidad } = cotizacionServicio;

            await connection.query(
                'UPDATE cotizaciones_servicios SET cantidad = ? WHERE id_cotizacion = ? AND id_servicio = ?',
                [cantidad, id_cotizacion, servicio]
            );
        } catch (error) {
            console.error('Error al actualizar cotización-servicio:', error);
            throw new Error('Error al actualizar cotización-servicio');
        } finally {
            await connection.end();
        }
    }

    async deleteCotizacionDetallada(id_cotizacion, id_servicio) {
        const connection = await createConnection();
        try {
            console.log(`dao elminar...Buscando cotización con id_cotizacion: ${id_cotizacion}, id_servicio: ${id_servicio}`);
            await connection.query('DELETE FROM cotizaciones_servicios WHERE id_cotizacion = ? AND id_servicio = ?', [id_cotizacion, id_servicio]);
        } catch (error) {
            console.error('Error al eliminar cotización-servicio:', error);
            throw new Error('Error al eliminar cotización-servicio');
        } finally {
            await connection.end();
        }
    }
}

module.exports = new CotizacionServicioDao();