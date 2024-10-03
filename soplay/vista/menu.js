const readline = require('readline');
const { UsuarioService, ServicioService, CotizacionService } = require('../service/ModuloService.js');
const Cotizacion = require('../model/Cotizacion.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pregunta(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function mostrarMenu() {
    console.log('\n--- Menú Principal ---');
    console.log('1. Agregar nuevo Usuario');
    console.log('2. Consultar Usuario');
    console.log('3. Crear Cotización');
    console.log('4. Crear Servicio');
    console.log('5. Consultar todos los servicios');
    console.log('6. Agregar Servicio a la Cotización');
    console.log('7. Consultar Cotizaciones de Usuario');
    console.log('0. Salir');
    console.log('-----------------------')
}


async function agregarUsuario() {

    console.log('\nAgrear nuevo Usuario');
    try {
        const usuario = {
            correo: await pregunta('Correo: '),
            password: await pregunta('Contraseña: '),
            nombres: await pregunta('Nombre: '),
            apellido_paterno: await pregunta('Apellido Paterno: '),
            apellido_materno: await pregunta('Apellido Materno: '),
            fecha_nacimiento: await pregunta('Fecha de Nacimiento (YYYY-MM-DD): '),
            tipo: await pregunta('Tipo (CLIENTE/EMPLEADO): '),
            sexo: await pregunta('Sexo (MASCULINO/FEMENINO/OTRO): '),
            telefono: await pregunta('Teléfono: '),
            direccion: {
                calle: await pregunta('Calle: '),
                numero: await pregunta('Número: '),
                colonia: await pregunta('Colonia: '),
                ciudad: await pregunta('Ciudad: '),
                estado: await pregunta('Estado: '),
                codigo_postal: await pregunta('Código Postal: ')
            }
        };
        const usuarioId = await UsuarioService.crearUsuario(usuario);
        console.log('Usuario creado con ID: ', usuarioId);
    } catch (error) {
        console.error('Error al crear usuario: ', error.message);
    }
}

async function consultarUsuario() {
    console.log('\nConsultar Usuario');
    try {
        const id = await pregunta('ID del Usuario: ');
        const usuario = await UsuarioService.consultarUsuarioPorId(id);
        console.log('Usuario encontrado', usuario);
    } catch (error) {
        console.error('Error al consultar usuario: ', error.message);
    }
}


async function crearCotizacion() {
    console.log('\nCrearCotización');
    try {
        const dataCotizacion = {
            serie: await pregunta('Serie de la Cotización: '),
            id_usuario: await pregunta('ID del Usuario: '),
            cotizacion_servicios: []
        };


        const servicio = await pregunta('ID del servicio: ');
        const cantidad = await pregunta('ingrese la cantidad: ');

        dataCotizacion.cotizacion_servicios.push({
            servicio: servicio,
            cantidad: cantidad
        });



        const id_cotizacion = await CotizacionService.crearCotizacion(dataCotizacion);
        console.log('Cotización creada con ID: ', id_cotizacion);
    } catch (error) {
        console.error('Error al crear cotización', error.message);
    }
}

async function crearServicio() {
    console.log('\nCrear Servicio');
    try {
        const dataServicio = {
            nombre: await pregunta('Nombre del servicio: '),
            descripcion: await pregunta('Descripción: '),
            precio: parseFloat(await pregunta('Precio: ')),
            fotos: []
        };

        let agregarOtraFoto = true;
        while (agregarOtraFoto) {
            const rutaFoto = await pregunta('Ruta de la imagen: ');


            dataServicio.fotos.push({
                id_foto: null,
                ruta: rutaFoto,
                id_servicio: null
            });

            const respuesta = await pregunta('¿Desea agregar otra foto? (s/n): ');
            agregarOtraFoto = respuesta.toLowerCase() === 's';

        }
        const servicio_id = await ServicioService.crearServicio(dataServicio);
        console.log('Servicio creado con ID: ', servicio_id);
    } catch (error) {
        console.error('Error al crear servicio: ', error.message);
    }
}

async function consultarTodosServicios() {
    console.log('\nConsultar Todos los Servicios');
    try {

        const servicios = await ServicioService.consultarTodosServicios();
        for (const servicio of servicios) {
            console.log(servicio);
        }

    } catch (error) {
        console.error('Error al consultar los servicio ', error.message);
    }
}

async function consultarCotizacionesUsuario() {
    console.log('\nConsultar Cotizaciones del Usuario');
    try {
        const id = await pregunta('ID del Usuario: ');
        const cotizaciones = await CotizacionService.obtenerCotizacionesPorUsuario(id);

        for (const cotizacion of cotizaciones) {
            console.log(cotizacion);
        }
    } catch (error) {
        console.error('Error al consultar cotizaciones: ', error.message);
    }
}

async function agregarServicioCotizacion() {
    console.log('\nAgregar Servicio a Cotización');
    try {
        const dataAgregarServicio = {
            id_cotizacion: parseInt(await pregunta('ID de la Cotización: ')),
            id_servicio: parseInt(await pregunta('ID del servicio: ')),
            cantidad: parseInt(await pregunta('Cantidad: '))
        };
        await CotizacionService.agregarServicio(dataAgregarServicio);
        console.log('Servicio agregado a la Cotización exitosamente');
    } catch (error) {
        console.error('Error al agregar Servicio a la Cotización', error.message);
    }
}

async function menuPrincipal() {
    while (true) {
        mostrarMenu();
        const opcion = await pregunta('Seleccione una opción: ');
        switch (opcion) {
            case '1':
                await agregarUsuario();
                break;
            case '2':
                await consultarUsuario();
                break;
            case '3':
                await crearCotizacion();
                break;
            case '4':
                await crearServicio();
                break;
            case '5':
                await consultarTodosServicios();
                break;
            case '6':
                await agregarServicioCotizacion();
                break;
            case '7':
                await consultarCotizacionesUsuario();
                break;
            case '0':
                console.log('Gracias por usar el sistema.');
                rl.close();
                return;
            default:
                console.log('Opción no válida. Por favor, intente de nuevo');
        }
    }
}




module.exports = { menuPrincipal };