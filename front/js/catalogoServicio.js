const listServicios = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/servicio', {
            method: 'GET',
        });

        if (response.ok) {
            const servicios = await response.json();
            const divServicios = document.getElementById('serviciosDesplegados');
            divServicios.innerHTML = '';

            servicios.forEach(servicio => {
                const servicioElemento = document.createElement('servicio-info');
                servicioElemento.setAttribute('servicioId', servicio.id_servicio);
                divServicios.appendChild(servicioElemento);
            });
        }else{
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al consultar los servicios:', error);
        window.alert('Error al consultar los servicios.');
    }
};
document.addEventListener('DOMContentLoaded', listServicios);

