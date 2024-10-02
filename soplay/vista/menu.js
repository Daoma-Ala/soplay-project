const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(){
    console.log('\n--- Menú Principal ---');
    console.log('1. Agregar nuevo Usuario');
    console.log('2. Consultar Usuario');
    console.log('3. Crear Cotización');
    console.log('4. Crear Servicio');
    console.log('0. Salir');
    console.log('-----------------------')
}

function agregarUsuario(){
    console.log('\nAgrear nuevo Usuario');
}

function consultarUsuario(){
    console.log('\nConsultar Usuario');
}

function crearCotizacion(){
    console.log('\nCrearCotización');
}

function crearServicio(){
    console.log('\nCrear Servicio');
}

function menuPrincipal(){
    mostrarMenu();
    rl.question('Seleccione una opción: ', (opcion) => {
        switch(opcion){
            case '1':
                agregarUsuario();
                break;
            case '2':
                consultarUsuario();
                break;
            case '3':
                crearCotizacion();
                break;
            case '4':
                crearServicio();
                break;
            case '0':
                console.log('Gracias por usar el sistema.');
                rl.close();
                return;
            default:
                console.log('Opción no válida. por favor, intente de nuevo');
        }
        menuPrincipal();
    });
}

menuPrincipal();