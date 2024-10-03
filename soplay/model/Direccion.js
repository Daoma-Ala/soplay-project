class Direccion {
  constructor(id_direccion, calle, numero, colonia, ciudad, estado, codigo_postal) {
    this.id_direccion = id_direccion;
    this.calle = calle;
    this.numero = numero;
    this.colonia = colonia;
    this.ciudad = ciudad;
    this.estado = estado;
    this.codigo_postal = codigo_postal;
  }
}
module.exports = Direccion;