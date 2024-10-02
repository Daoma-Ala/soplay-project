class Usuario {
  constructor(id_usuario, correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono, id_direccion) {
    this.id_usuario = id_usuario;
    this.correo = correo;
    this.password = password;
    this.nombres = nombres;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.fecha_nacimiento = fecha_nacimiento;
    this.tipo = tipo;
    this.sexo = sexo;
    this.telefono = telefono;
    this.id_direccion = id_direccion;
  }
}

module.exports = Usuario;
