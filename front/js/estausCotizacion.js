const enviarBoton = document.getElementById('actualizar_cotizacion');


const actualizarCotizacion = async () => {
    try {

        const urlParams = new URLSearchParams(window.location.search);

        id_cotizacion = urlParams.get('id');

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
