const agregarCotizacion = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/cotizacion', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            const datos= await response.json();
            const divServicios = document.getElementById('serviciosDesplegados');
            
            console.log(datos.id_cotizacion);
            
        
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al consultar los servicios:', error);
        window.alert('Error al consultar los servicios.');
    }
};

document.addEventListener('DOMContentLoaded', agregarCotizacion);