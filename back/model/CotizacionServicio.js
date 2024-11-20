class CotizacionServicio {
  constructor(id_cotizacion, servicio, cantidad, sub_total) {
    this.id_cotizacion = id_cotizacion;
    this.servicio = servicio;
    this.cantidad = cantidad;
    this.sub_total = sub_total;
  }
}

module.exports = CotizacionServicio;
