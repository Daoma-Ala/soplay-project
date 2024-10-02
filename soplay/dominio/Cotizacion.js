class Cotizacion {
  constructor(id_cotizacion, serie, fecha_cotizacion, monto, id_usuario) {
    this.id_cotizacion = id_cotizacion;
    this.serie = serie;
    this.fecha_cotizacion = fecha_cotizacion;
    this.monto = monto;
    this.id_usuario = id_usuario;
  }
}

module.exports = Cotizacion;
