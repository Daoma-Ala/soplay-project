document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idCotizacion = urlParams.get("id_cotizacion");

    if (!idCotizacion) {
        alert("No se especificó una cotización válida.");
        return;
    }

    const tableBody = document.querySelector("#cotizacionesTable tbody");

    try {
        const response = await fetch(`http://localhost:3000/api/v1/cotizacion-detalle/${idCotizacion}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );


        if (!response.ok) {
            throw new Error("Error al obtener los servicios de la cotización.");
        }

        const detalles = await response.json();
        console.log(detalles);
        await buscarCotizacion(detalles[0].id_cotizacion);


        tableBody.innerHTML = detalles
            .map((detalle) => {
                const servicio = detalle.id_servicio || {};
                return `
                    <tr>
                        <td>${servicio.nombre || "Sin nombre"}</td>
                        <td>${servicio.descripcion || "Sin descripción"}</td>
                        <td>$${servicio.precio?.toFixed(2) || "0.00"}</td>
                        <td>${detalle.cantidad}</td>
                        <td>$${(servicio.precio * detalle.cantidad).toFixed(2)}</td>
                        <td>
                            <button class="eliminar" data-id-servicio="${detalle.id_servicio.id_servicio}" data-id-cotizacion="${idCotizacion}">
                                Eliminar
                            </button>
                        </td>
                    </tr>`;
            })
            .join("");

        tableBody.addEventListener("click", async (event) => {
            if (event.target.classList.contains("eliminar")) {
                const idServicio = event.target.dataset.idServicio;
                const idCotizacion = event.target.dataset.idCotizacion;

                if (confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
                    try {

                        const deleteResponse = await fetch(
                            `http://localhost:3000/api/v1/cotizacion-detalle/${idCotizacion}/${idServicio}`,
                            {

                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',


                            }
                        );



                        if (!deleteResponse.ok) {
                            throw new Error("Error al eliminar el servicio.");
                        }

                        event.target.closest("tr").remove();
                        alert("Servicio eliminado correctamente.");
                    } catch (error) {
                        console.error("Error al eliminar el servicio:", error);
                        alert("No se pudo eliminar el servicio.");
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error al cargar los servicios de la cotización:", error);
        alert("No se pudieron cargar los servicios de la cotización.");
    }
});


const buscarCotizacion = async (id_cotizacion) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/cotizacion/${id_cotizacion}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const datos = await response.json();

            document.getElementById('serie').textContent = `Serie: ${datos.serie}`;
            document.getElementById('estatus').textContent = `Estatus: ${datos.estatus}`;

            if (datos.estatus !== "PENDIENTE") {
                quitarBotonesEstado();
            }

        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al buscar una cotización:', error);
        window.alert('Error al buscarr una cotización.');
    }
};

const quitarBotonesEstado = () => {

    const botones = document.querySelectorAll('.estado-boton');
    botones.forEach(boton => boton.style.display = 'none');
};