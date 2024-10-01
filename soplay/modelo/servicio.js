const pool = require('../controlador/conexion');

class Servicio {
    constructor(id, nombre, descripcion, precio, foto) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.foto = foto;
    }
  
    static async crearServicio(nombre, descripcion, precio, foto) {
      const conn = await connection;
      try {
        const [result] = await conn.execute(
          'INSERT INTO servicios (nombre, descripcion, precio, foto) VALUES (?, ?, ?, ?)',
          [nombre, descripcion, precio, foto]
        );
        return new Servicio(result.insertId, nombre, descripcion, precio, foto);
      } finally {
        await conn.end(); 
      }
    }
  
    static async obtenerServicios() {
      const conn = await connection;
      try {
        const [rows] = await conn.execute('SELECT * FROM servicios');
        return rows.map(row => new Servicio(row.id_servicio, row.nombre, row.descripcion, row.precio, row.foto));
      } finally {
        await conn.end(); 
      }
    }
  }
  
  module.exports = Servicio;
