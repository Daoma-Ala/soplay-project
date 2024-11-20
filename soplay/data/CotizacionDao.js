const createConnection = require('../config/conexion.js');
const Cotizacion = require('../model/Cotizacion.js');
const CotizacionServicioDao = require('./CotizacionDetalladaDao.js');

class CotizacionDao {

    async addCotizacion(cotizacion) {
        const connection = await createConnection();
        try {
            await connection.beginTransaction();
            const { serie, id_usuario, cotizacion_servicios } = cotizacion;
            const [resultado] = await connection.query(
                'INSERT INTO cotizaciones (serie, id_usuario) VALUES (?, ?)',
                [serie, id_usuario]
            );
            for (const cotizacion_servicio of cotizacion_servicios) {
                cotizacion_servicio.id_cotizacion = resultado.insertId;
                CotizacionServicioDao.addCotizacionDetalladaCreate(cotizacion_servicio, connection);
            }
            await connection.commit();
            return resultado.insertId;
        } catch (error) {
            await connection.rollback();
            console.error('Error al crear cotización:', error);
            throw new Error('Error al crear cotización');
        } finally {
            await connection.end();
        }
    }

    async getCotizacionById(id) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM cotizaciones WHERE id_cotizacion = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Cotización no encontrada');
            }
            const row = rows[0];

            const cotizacion_servicios = await CotizacionServicioDao.getAllByCotizacionId(row.id_cotizacion);

            return new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.id_usuario, cotizacion_servicios);
        } catch (error) {
            console.error('Error al obtener cotización:', error);
            throw new Error('Error al obtener cotización');
        } finally {
            await connection.end();
        }
    }

    async updateActualizacion(cotizacion) {
        const connection = await createConnection();
        try {
            const { id_cotizacion, serie, id_usuario } = cotizacion;

            await connection.query(
                'UPDATE cotizaciones SET serie = ?, id_usuario = ? WHERE id_cotizacion = ?',
                [serie, id_usuario, id_cotizacion]
            );
        } catch (error) {
            console.error('Error al actualizar cotización:', error);
            throw new Error('Error al actualizar cotización');
        } finally {
            await connection.end();
        }
    }

    async getCotizacionesbyUsuario(id_usuario) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM cotizaciones WHERE id_usuario = ?', [id_usuario]);

            let cotizaciones = rows.map(row => new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.id_usuario));
            for (const cotizacion of cotizaciones) {
                const cotizacion_servicios = await CotizacionServicioDao.getAllByCotizacionId(cotizacion.id_cotizacion);
                cotizacion.cotizacion_servicios = cotizacion_servicios;
            }
            return cotizaciones;

        } catch (error) {
            console.error('Error al obtener cotizaciones por usuario:', error);
            throw new Error('Error al obtener cotizaciones por usuario');
        } finally {
            await connection.end();
        }
    }

    async getAllCotizaciones() {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM cotizaciones');
            return rows.map(row => new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.id_usuario));
        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
            throw new Error('Error al obtener cotizaciones');
        } finally {
            await connection.end();
        }
    }

    async deleteCotizacion(id) {
        const connection = await createConnection();
        try {
            await connection.query('DELETE FROM cotizaciones WHERE id_cotizacion = ?', [id]);
        } catch (error) {
            console.error('Error al eliminar cotización:', error);
            throw new Error('Error al eliminar cotización');
        } finally {
            await connection.end();
        }
    }
}

module.exports = new CotizacionDao();