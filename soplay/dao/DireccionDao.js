const createConnection = require('../config/conexion.js');
const Direccion = require('../model/Direccion.js');

class DireccionDao {

    async crearDireccion(direccion, connection) {
        try {
            const { calle, numero, colonia, ciudad, estado, codigo_postal } = direccion;
            const [resultado] = await connection.query(
                'INSERT INTO direccion (calle, numero, colonia, ciudad, estado, codigo_postal) VALUES (?, ?, ?, ?, ?, ?)',
                [calle, numero, colonia, ciudad, estado, codigo_postal]);
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear dirección:', error);
            throw new Error('Error al crear dirección');
        }
    }

    async consultarDireccionPorId(id) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM direccion WHERE id_direccion = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Dirección no encontrada');
            }
            const row = rows[0];
            return new Direccion(
                row.id_direccion,
                row.calle,
                row.numero,
                row.colonia,
                row.ciudad,
                row.estado,
                row.codigo_postal
            );
        } catch (error) {
            console.error('Error al obtener dirección:', error);
            throw new Error('Error al obtener dirección');
        } finally {
            await connection.end();
        }
    }

    async actualizarDireccion(id_direccion, direccionActualizada) {
        const connection = await createConnection();
        try {
            const { calle, numero, colonia, ciudad, estado, codigo_postal } = direccionActualizada;
            await connection.query(
                'UPDATE direccion SET calle = ?, numero = ?, colonia = ?, ciudad = ?, estado = ?, codigo_postal = ? WHERE id_direccion = ?',
                [calle, numero, colonia, ciudad, estado, codigo_postal, id_direccion]);
        } catch (error) {
            console.error('Error al actualizar dirección:', error);
            throw new Error('Error al actualizar dirección');
        } finally {
            await connection.end();
        }
    }

    async eliminarDireccion(id_direccion) {
        const connection = await createConnection();
        try {
            await connection.query('DELETE FROM direccion WHERE id_direccion = ?', [id_direccion]);
        } catch (error) {
            console.error('Error al eliminar dirección:', error);
            throw new Error('Error al eliminar dirección');
        } finally {
            await connection.end();
        }
    }
}

module.exports = new DireccionDao();