document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#cotizacionesTable tbody");

    const API_URL = "http://localhost:3000/api/v1/cotizacion";

    const cargarCotizaciones = async () => {
        try {
            const response = await fetch(API_URL, {
                credentials: "include", // Incluye cookies si las necesitas
            });

            if (!response.ok) {
                throw new Error("Error al obtener cotizaciones");
            }

            const cotizaciones = await response.json();

            tableBody.innerHTML = cotizaciones
                .map((cotizacion) => {
                    return `
                    <tr>
                        <td>${cotizacion.serie}</td>
                        <td>${cotizacion.id_usuario}</td>
                        <td>${cotizacion.monto.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</td>
                        <td>${new Date(cotizacion.fecha_cotizacion).toLocaleDateString()}</td>
                        <td>${cotizacion.estatus ? cotizacion.estatus : "Pendiente"}</td>
                        <td><button class="eliminar" data-id="${cotizacion.id_cotizacion}">Eliminar</button></td>
                        <td><button class="ver" data-id="${cotizacion.id_cotizacion}">Ver</button></td>
                    </tr>`;
                })
                .join("");
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al intentar cargar las cotizaciones. Por favor, intente nuevamente.");
        }
    };

    cargarCotizaciones();

    tableBody.addEventListener("click", async (e) => {
        const btn = e.target;

        if (btn.classList.contains("eliminar")) {
            const id = btn.dataset.id;
            if (confirm("¿Estás seguro de que deseas eliminar esta cotización?")) {
                try {
                    const response = await fetch(`${API_URL}/${id}`, {
                        method: "DELETE",
                        credentials: "include",
                    });

                    if (!response.ok) {
                        throw new Error("Error al eliminar la cotización");
                    }

                    alert("Cotización eliminada correctamente.");
                    cargarCotizaciones();
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    alert("No se pudo eliminar la cotización. Inténtalo nuevamente.");
                }
            }
        } else if (btn.classList.contains("ver")) {
            const id = btn.dataset.id;
            window.location.href = `adminCotizacionDetallada.html?id_cotizacion=${id}`;
        }
    });
});

