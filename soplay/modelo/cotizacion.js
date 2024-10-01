const pool = require('../controlador/conexion');

class Cotizacion {
    constructor(id, serie, fechaCotizacion, monto, servicios, idUsuario) {
      this.id = id;
      this.serie = serie;
      this.fechaCotizacion = fechaCotizacion;
      this.monto = monto;
      this.servicios = servicios;
      this.idUsuario = idUsuario;
    }
  
    static async crearCotizacion(serie, fechaCotizacion, monto, servicios, idUsuario) {
      const conn = await connection;
      try {
        const [result] = await conn.execute(
          'INSERT INTO cotizaciones (serie, fecha_cotizacion, monto, servicios, id_usuario) VALUES (?, ?, ?, ?, ?)',
          [serie, fechaCotizacion, monto, servicios, idUsuario]
        );
        return new Cotizacion(result.insertId, serie, fechaCotizacion, monto, servicios, idUsuario);
      } finally {
        await conn.end();  
      }
    }
  
    static async obtenerCotizaciones() {
      const conn = await connection;
      try {
        const [rows] = await conn.execute('SELECT * FROM cotizaciones');
        return rows.map(row => new Cotizacion(row.id_cotizacion, row.serie, row.fecha_cotizacion, row.monto, row.servicios, row.id_usuario));
      } finally {
        await conn.end();  
      }
    }
  }
  
  module.exports = Cotizacion;
