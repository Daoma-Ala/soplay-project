const createConnection = require('../config/conexion.js');
const Direccion = require('../model/DireccionUsuario.js');

class DireccionDao {

    async crear(direccion) {
        const db = await createConnection();
        try {
            const { calle, numero, colonia, ciudad, estado, codigo_postal } = direccion;
            const [resultado] = await db.query(
                'INSERT INTO direccion_usuario (calle, numero, colonia, ciudad, estado, codigo_postal) VALUES (?, ?, ?, ?, ?, ?)',
                [calle, numero, colonia, ciudad, estado, codigo_postal]);
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear dirección:', error);
            throw new Error('Error al crear dirección');
        } finally {
            await db.end();
        }
    }

    async consultarId(id) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM direccion_usuario WHERE id_direccion = ?', [id]);
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
            await db.end();
        }
    }

    async actualizar(direccion) {
        const db = await createConnection();
        try {
            const { id_direccion, calle, numero, colonia, ciudad, estado, codigo_postal } = direccion;
            await db.query(
                'UPDATE direccion_usuario SET calle = ?, numero = ?, colonia = ?, ciudad = ?, estado = ?, codigo_postal = ? WHERE id_direccion = ?',
                [calle, numero, colonia, ciudad, estado, codigo_postal, id_direccion]
            );
        } catch (error) {
            console.error('Error al actualizar dirección:', error);
            throw new Error('Error al actualizar dirección');
        } finally {
            await db.end();
        }
    }

    async eliminar(id_direccion) {
        const db = await createConnection();
        try {
            await db.query('DELETE FROM direccion_usuario WHERE id_direccion = ?', [id_direccion]);
        } catch (error) {
            console.error('Error al eliminar dirección:', error);
            throw new Error('Error al eliminar dirección');
        } finally {
            await db.end();
        }
    }
}

module.exports = new DireccionDao();