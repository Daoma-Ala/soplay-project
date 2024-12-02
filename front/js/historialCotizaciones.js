const listCotizaciones = async () => {

    try {
        const response = await fetch('http://localhost:3000/api/v1/cotizacion/usuario', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const cotizaciones = await response.json();
            const divCotizaciones = document.getElementById('serviciosDesplegados');

            divCotizaciones.innerHTML = '';

            if (!Array.isArray(cotizaciones) || cotizaciones.length === 0) {
                divCotizaciones.innerHTML = "<p>No hay cotizaciones disponibles.</p>";
                return;
            }

            cotizaciones.forEach(cotizacion => {
                if (!cotizacion) return;

             if (cotizacion.estatus !== "BORRADOR") {
                    const cotizacionElemento = document.createElement('div');
                    cotizacionElemento.classList.add('cotizacion-item');

                    const serie = cotizacion.serie || 'N/A';
                    const fecha = cotizacion.fecha_cotizacion ?
                        new Date(cotizacion.fecha_cotizacion).toLocaleString() : 'Fecha no disponible';
                    const monto = typeof cotizacion.monto === 'number' ?
                        cotizacion.monto.toFixed(2) : '0.00';
                    const estatus = cotizacion.estatus || 'Pendiente';
                    const id = cotizacion.id_cotizacion || 0;

                    cotizacionElemento.innerHTML = `
                        <h3>Cotización #${serie}</h3>
                        <p>Fecha: ${fecha}</p>
                        <p>Monto: $${monto}</p>
                        <p>Estatus: ${estatus}</p>
                        <button onclick="verDetalleCotizacion(${id})">Ver Detalles</button>
                    `;
                    divCotizaciones.appendChild(cotizacionElemento);
                 }

            });
        } else {
            if (response.status === 401) {
                return;
            }
            const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
            window.alert(`Error: ${errorData.error || 'Error desconocido al obtener cotizaciones'}`);
        }
    } catch (error) {

        window.alert('Error al consultar las cotizaciones ' + error);
    }
};




const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-Mx', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const verDetalleCotizacion = async (idCotizacion) => {
    if (!idCotizacion) return;
    1
    try {
        const modal = document.getElementById('modal-detalles');

        const response = await fetch(`http://localhost:3000/api/v1/cotizacion/${idCotizacion}`, {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();


            const detallesCotizacion = document.getElementById('detalles-cotizacion');
            detallesCotizacion.innerHTML = `
            <h3>Cotización #${data.serie || 'N/A'}</h3>
            <p>Fecha: ${formatDate(data.fecha_cotizacion)}</p>
            <p>Estatus: <span class="status-badge status-${data.estatus}">${data.estatus}</span></p>
            `;

            const servicioBody = document.getElementById('servicios-body');
            servicioBody.innerHTML = '';


            if (data.cotizacion_servicios && data.cotizacion_servicios.length > 0) {
                data.cotizacion_servicios.forEach(servicio => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${servicio.id_servicio.nombre}</td>
                    <td>${servicio.cantidad}</td>
                    <td>${formatMoney(servicio.id_servicio.precio)}</td>
                    <td>${formatMoney(servicio.sub_total)}</td>
                    `;
                    servicioBody.appendChild(row);
                });
            } else {
                servicioBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center;">No hay servicios registrados</td> 
                </tr>   
                `;
            }
            document.getElementById('total-monto').textContent = formatMoney(data.monto || 0);

            modal.style.display = 'block';

            const closeBtn = document.querySelector('.close-modal');
            closeBtn.onclick = () => modal.style.display = 'none';

            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        } else {
            if (response.status === 401) {
                window.location.href = 'iniciarSesion.html';
                return;
            }
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error || 'Error al obtener detalles de la cotización'}`);
        }
    } catch (error) {
        console.error(error);
        window.alert('Error al consultar los detalles de la cotización');
    }
};

document.addEventListener('DOMContentLoaded', listCotizaciones);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('modal-detalles');
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }
});