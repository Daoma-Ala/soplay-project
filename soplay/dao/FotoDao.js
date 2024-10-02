const createConnection = require('../config/conexion.js');
const Foto = require('../dominio/Foto.js');

class FotoDao {

    async crear(foto) {
        const db = await createConnection();
        try {
            const { ruta, id_servicio } = foto;
            const [resultado] = await db.query(
                'INSERT INTO fotos (ruta, id_servicio) VALUES (?, ?)',
                [ruta, id_servicio]
            );
            return resultado.insertId;
        } catch (error) {
            console.error('Error al crear foto:', error);
            throw new Error('Error al crear foto');
        } finally {
            await db.end();
        }
    }

    async consultarId(id) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM fotos WHERE id_foto = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Foto no encontrada');
            }
            const row = rows[0];
            return new Foto(row.id_foto, row.ruta, row.id_servicio);
        } catch (error) {
            console.error('Error al obtener foto:', error);
            throw new Error('Error al obtener foto');
        } finally {
            await db.end();
        }
    }

    async actualizar(foto) {
        const db = await createConnection();
        try {
            const { id_foto, ruta, id_servicio } = foto;
            await db.query(
                'UPDATE fotos SET ruta = ?, id_servicio = ? WHERE id_foto = ?',
                [ruta, id_servicio, id_foto]
            );
        } catch (error) {
            console.error('Error al actualizar foto:', error);
            throw new Error('Error al actualizar foto');
        } finally {
            await db.end();
        }
    }

    async eliminar(id) {
        const db = await createConnection();
        try {
            await db.query('DELETE FROM fotos WHERE id_foto = ?', [id]);
        } catch (error) {
            console.error('Error al eliminar foto:', error);
            throw new Error('Error al eliminar foto');
        } finally {
            await db.end();
        }
    }

    async obtenerFotosServicio(id_servicio) {
        const db = await createConnection();
        try {
            const [rows] = await db.query('SELECT * FROM fotos WHERE id_servicio = ?', [id_servicio]);
            return rows.map(row => new Foto(row.id_foto, row.ruta, row.id_servicio));
        } catch (error) {
            console.error('Error al obtener fotos por servicio:', error);
            throw new Error('Error al obtener fotos por servicio');
        } finally {
            await db.end();
        }
    }
}

module.exports = new FotoDao();