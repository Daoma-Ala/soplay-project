let id_cotizacion = '';

const deplegarDatos = async (idCotizacion) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/cotizacion/${idCotizacion}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const datos = await response.json();


            actualizarUI(datos.serie, datos.monto);

            const tabla = document.querySelector('.tabla_servicios tbody');
            tabla.innerHTML = '';
            for (const detalle of datos.cotizacion_servicios) {
                const id_servicio = detalle.id_servicio.id_servicio;
                const servicioResponse = await fetch(`http://localhost:3000/api/v1/servicio/${id_servicio}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (servicioResponse.ok) {
                    const servicio = await servicioResponse.json();
                    agregarFilaServicio(servicio, detalle.cantidad, detalle.sub_total);
                } else {
                    console.error('Error al obtener el servicio:', servicioResponse.statusText);
                }
            }
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al consultar los datos de la cotización:', error);
        window.alert('Error al consultar los datos de la cotización.');
    }
};

const agregarFilaServicio = (servicio, cantidad, subTotal) => {
    const tabla = document.querySelector('.tabla_servicios tbody');
    const fila = document.createElement('tr');


    fila.innerHTML = `
        <td>${servicio.nombre}</td>
        <td>${servicio.descripcion}</td>
        <td>$${servicio.precio}</td>
        <td>${cantidad}</td>
        <td>$${subTotal}</td>
        <td><button class="eliminar" onclick="eliminarServicio('${servicio.id_servicio}')">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
};

// Función para eliminar un servicio (si necesitas implementarlo)
const eliminarServicio = async (id_servicio) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/cotizacion-detalle/${id_cotizacion}/${id_servicio}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            alert('Servicio eliminado');
            deplegarDatos(id_cotizacion);
        } else {
            alert('Error al eliminar el servicio');
        }
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        alert('Error al eliminar el servicio');
    }
};


// Función para actualizar la interfaz con los datos de la cotización
const actualizarUI = (serie, total) => {
    document.getElementById('serie').textContent = `Serie: ${serie}`;
    document.getElementById('total').textContent = `Total: ${total}`;
};

// Función para agregar una nueva cotización
const agregarCotizacion = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/cotizacion', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            const datos = await response.json();
            id_cotizacion = datos.id_cotizacion;

            await deplegarDatos(id_cotizacion);
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al agregar una nueva cotización:', error);
        window.alert('Error al agregar una nueva cotización.');
    }
};

// Función para cargar el combo box con servicios
const cargarServicios = async () => {
    const serviciosSelect = document.querySelector('select[name="servicios"]');

    try {
        const response = await fetch('http://localhost:3000/api/v1/servicio', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) throw new Error('Error al obtener los servicios');

        const servicios = await response.json();
        serviciosSelect.innerHTML = '<option selected disabled>Seleccione un servicio</option>';

        servicios.forEach(servicio => {
            const option = document.createElement('option');
            option.value = servicio.id_servicio; // Guardar el ID del servicio
            option.textContent = `${servicio.nombre} - $${servicio.precio}`;
            serviciosSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando servicios:', error);
    }
};

// Manejo del formulario de registro de servicios para la cotizacion
const manejarRegistro = async () => {
    const registrarForm = document.getElementById('registrar');
    const serviciosSelect = document.querySelector('select[name="servicios"]');

    registrarForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Obtener el servicio seleccionado y la cantidad
        const selectedService = parseInt(serviciosSelect.value, 10);
        const cantidad = registrarForm.cantidad.value;

        if (!selectedService || !cantidad) {
            alert('Por favor, selecciona un servicio y escribe la cantidad.');
            return;
        }


        const data = {
            id_servicio: selectedService,
            id_cotizacion,
            cantidad: parseInt(cantidad),
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/cotizacion-detalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Error al registrar el servicio');

            const result = await response.json();
            alert(result.message);
            registrarForm.reset();
            deplegarDatos(id_cotizacion);
        } catch (error) {
            console.error('Error al registrar el servicio:', error);
            alert('Ocurrió un problema. Intenta de nuevo.');
        }
    });
};



const eliminarBoton = document.getElementById('eliminarCotizacion');


const eliminarCotizacion = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/cotizacion/${id_cotizacion}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            alert('Cotización eliminada');
            window.location.href = "/cotizacion.html"; // Redirige a la página de cotización
        } else {
            alert('Error al eliminar la cotización');
        }
    } catch (error) {
        console.error('Error al eliminar la cotización:', error);
        alert('Error al eliminar la cotización');
    }
};

eliminarBoton.addEventListener('click', eliminarCotizacion);

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    await agregarCotizacion();
    await cargarServicios();
    await manejarRegistro();
});


// Manejo para emviar la cotizacion
const enviarBoton = document.getElementById('actualizar_cotizacion');


const actualizarCotizacion = async () => {
    try {


        const estatus = { estatus: 'PENDIENTE' };

        console.log(id_cotizacion);

        const response = await fetch(`http://localhost:3000/api/v1/cotizacion/${id_cotizacion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estatus),
            credentials: 'include',
        });

        if (response.ok) {
            alert('Cotización actualizada');
            window.location.href = "/cotizacion.html";
        } else {
            alert('Error al actualizar la cotización');
        }
    } catch (error) {
        console.error('Error al actualizar la cotización:', error);
        alert('Error al actualizar la cotización');
    }
};

enviarBoton.addEventListener('click', actualizarCotizacion);
