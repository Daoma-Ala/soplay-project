const createConnection = require('../config/conexion.js');
const Direccion = require('../model/Direccion.js');

class DireccionDao {

    async addDireccion(direccion, connection) {
        try {
            const { calle, numero, colonia, ciudad, estado, codigo_postal, id_usuario } = direccion;
            const [resultado] = await connection.query(
                'INSERT INTO direccion (calle, numero, colonia, ciudad, estado, codigo_postal, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [calle, numero, colonia, ciudad, estado, codigo_postal, id_usuario]);
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear dirección:', error);
            throw new Error('Error al crear dirección');
        }
    }

    async getDireccionById(id_direccion) {
        const connection = await createConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM direccion WHERE id_usuario = ?', [id_direccion]);
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

    async updateDireccion(id_usuario, datosDireccion) {
        const connection = await createConnection();
        try {
            const campos = Object.keys(datosDireccion);
            const valores = Object.values(datosDireccion);
            if (campos.length === 0) {
                throw new Error('No se proporcionaron campos para actualizar');
            }
            const setClause = campos.map(campo => `${campo} = ?`).join(', ');
            valores.push(id_usuario);
            const query = `UPDATE direccion SET ${setClause} WHERE id_usuario = ?`;
            await connection.query(query, valores);
        } catch (error) {
            console.error('Error al actualizar dirección:', error);
            throw new Error('Error al actualizar dirección');
        } finally {
            await connection.end();
        }
    }

    /*
    async eliminarDireccion(id_direccion, connection) {
        try {
            await connection.query('DELETE FROM direccion WHERE id_direccion = ?', [id_direccion]);
        } catch (error) {
            console.error('Error al eliminar dirección:', error);
            throw new Error('Error al eliminar dirección');
        }
     
    }
               */
}

module.exports = new DireccionDao();