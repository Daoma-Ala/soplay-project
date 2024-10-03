const { UsuarioService, ServicioService, CotizacionService } = require('./service/ModuloService.js');

(async () => {
    try {
    /*
        
                const data = {
                    correo: 'usuario@example.com',
                    password: 'contraseñaSegura',
                    nombres: 'Juan',
                    apellido_paterno: 'Pérez',
                    apellido_materno: 'Gómez',
                    fecha_nacimiento: '1990-01-01',
                    tipo: 'Cliente',
                    sexo: 'Masculino',
                    telefono: '1234567890',
                    direccion: {
                        calle: 'Calle Ejemplo',
                        numero: '123',
                        colonia: 'Colonia Ejemplo',
                        ciudad: 'Ciudad Ejemplo',
                        estado: 'Estado Ejemplo',
                        codigo_postal: '12345',
                    },
                };

                const usuarioId = await UsuarioService.crearUsuario(data);
        
                console.log('Usuario creado con ID:', usuarioId);
        
       
 
        const dataServicio = {
            nombre: 'Pegado de plastico',
            descripcion: 'Pegado de plastico',
            precio: 500.00
        };
        const servicio_id = await ServicioService.crearServicio(dataServicio);
        console.log('Servicio creado con ID:', servicio_id);
            
   

        const dataCotizacion = {
            serie: 'COT-2024-001',
            id_usuario: 1
        };

        const id_cotizacion = await CotizacionService.crearCotizacion(dataCotizacion);
        console.log('Cotización creada con ID:', id_cotizacion);


     
        dataAgregarServicio = {
            id_cotizacion: 1,
            id_servicio: 1,
            cantidad: 4
        };
        CotizacionService.agregarServicio(dataAgregarServicio);
  
        console.log(await UsuarioService.consultarUsuarioPorId(1));
         */
    } catch (error) {
        console.error(error.message);
    }
})();