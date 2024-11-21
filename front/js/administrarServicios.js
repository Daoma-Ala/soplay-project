const listServicios = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/servicio', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const servicios = await response.json();

            const tbody = document.querySelector('.tabla_servicios tbody');
            tbody.innerHTML = '';


            servicios.forEach(servicio => {
                const tr = document.createElement('tr');

                const tdNombre = document.createElement('td');
                tdNombre.textContent = servicio.nombre;
                const tdDescripcion = document.createElement('td');
                tdDescripcion.textContent = servicio.descripcion;
                const tdPrecio = document.createElement('td');
                tdPrecio.textContent = servicio.precio;


                const tdEditar = document.createElement('td');
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.onclick = () => editarServicio(servicio.id_servicio);
                tdEditar.appendChild(editarBtn);

                const tdEliminar = document.createElement('td');
                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'Eliminar';
                eliminarBtn.onclick = () => eliminarServicio(servicio.id_servicio, tr);
                tdEliminar.appendChild(eliminarBtn);


                tr.appendChild(tdNombre);
                tr.appendChild(tdDescripcion);
                tr.appendChild(tdPrecio);
                tr.appendChild(tdEditar);
                tr.appendChild(tdEliminar);

                tbody.appendChild(tr);
            });
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al consultar los servicios:', error);
        window.alert('Error al consultar los servicios.');
    }
};


const editarServicio = (id) => {
    console.log(`Editar servicio con id: ${id}`);
};


const eliminarServicio = async (id, tr) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/servicio/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            window.alert(`${data.message}`);

            tr.remove();
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }

    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        window.alert('Error al eliminar el servicio.');
    }
};


document.addEventListener('DOMContentLoaded', listServicios);
