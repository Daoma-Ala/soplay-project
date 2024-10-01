class CotizacionServicio {
    constructor(id_cotizacion, id_servicio, cantidad, sub_total) {
      this.id_cotizacion = id_cotizacion;
      this.id_servicio = id_servicio;
      this.cantidad = cantidad;
      this.sub_total = sub_total;
    }
  }
  
  module.exports = CotizacionServicio;
  