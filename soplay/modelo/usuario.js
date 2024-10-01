const pool = require('../controlador/conexion');

class Usuario {
    constructor(id, correo, password, nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, telefono) {
      this.id = id;
      this.correo = correo;
      this.password = password;
      this.nombres = nombres;
      this.apellidoPaterno = apellidoPaterno;
      this.apellidoMaterno = apellidoMaterno;
      this.fechaNacimiento = fechaNacimiento;
      this.sexo = sexo;
      this.telefono = telefono;
    }
  
    static async crearUsuario(correo, password, nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, telefono) {
      const conn = await connection;
      try {
        const [result] = await conn.execute(
          'INSERT INTO usuarios (correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [correo, password, nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, telefono]
        );
        return new Usuario(result.insertId, correo, password, nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, telefono);
      } finally {
        await conn.end();
      }
    }
  
    static async obtenerUsuarios() {
      const conn = await connection;
      try {
        const [rows] = await conn.execute('SELECT * FROM usuarios');
        return rows.map(row => new Usuario(row.id_usuario, row.correo, row.password, row.nombres, row.apellido_paterno, row.apellido_materno, row.fecha_nacimiento, row.sexo, row.telefono));
      } finally {
        await conn.end();
      }
    }
  }
  
  module.exports = Usuario;
