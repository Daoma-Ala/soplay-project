const pool = require('../controlador/conexion');

class DireccionUsuario {
    constructor(id, calle, numero, colonia, ciudad, estado, codigoPostal, idUsuario) {
      this.id = id;
      this.calle = calle;
      this.numero = numero;
      this.colonia = colonia;
      this.ciudad = ciudad;
      this.estado = estado;
      this.codigoPostal = codigoPostal;
      this.idUsuario = idUsuario;
    }
  
    static async crearDireccion(calle, numero, colonia, ciudad, estado, codigoPostal, idUsuario) {
      const conn = await connection;
      try {
        const [result] = await conn.execute(
          'INSERT INTO direccion_usuario (calle, numero, colonia, ciudad, estado, codigo_postal, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [calle, numero, colonia, ciudad, estado, codigoPostal, idUsuario]
        );
        return new DireccionUsuario(result.insertId, calle, numero, colonia, ciudad, estado, codigoPostal, idUsuario);
      } finally {
        await conn.end(); 
      }
    }
  
    static async obtenerDirecciones() {
      const conn = await connection;
      try {
        const [rows] = await conn.execute('SELECT * FROM direccion_usuario');
        return rows.map(row => new DireccionUsuario(row.id_direccion, row.calle, row.numero, row.colonia, row.ciudad, row.estado, row.codigo_postal, row.id_usuario));
      } finally {
        await conn.end(); 
      }
    }
  }
  
  module.exports = DireccionUsuario;