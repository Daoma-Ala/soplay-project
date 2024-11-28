document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idCotizacion = urlParams.get("id_cotizacion");

    if (!idCotizacion) {
        alert("No se especificó una cotización válida.");
        return;
    }

    const tableBody = document.querySelector("#cotizacionesTable tbody");

    try {
        const response = await fetch(`/api/v1/cotizacion-detalle/${idCotizacion}`);
        if (!response.ok) {
            throw new Error("Error al obtener los servicios de la cotización.");
        }

        const detalles = await response.json();

        tableBody.innerHTML = detalles
            .map((detalle) => {
                const servicio = detalle.servicio || {};
                return `
                    <tr>
                        <td>${servicio.nombre || "Sin nombre"}</td>
                        <td>${servicio.descripcion || "Sin descripción"}</td>
                        <td>$${servicio.precio?.toFixed(2) || "0.00"}</td>
                        <td>${detalle.cantidad}</td>
                        <td>$${(servicio.precio * detalle.cantidad).toFixed(2)}</td>
                        <td>
                            <button class="eliminar" data-id-servicio="${detalle.id_servicio}" data-id-cotizacion="${idCotizacion}">
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
                            `/api/v1/cotizacion-detalle/${idCotizacion}/${idServicio}`,
                            { method: "DELETE" }
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
