

document.querySelectorAll('.estado-boton').forEach((boton) => {
    boton.addEventListener('click', async (event) => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const id_cotizacion = urlParams.get('id_cotizacion');

            const estatus = { estatus: event.target.dataset.estado };


            const response = await fetch(`http://localhost:3000/api/v1/cotizacion/${id_cotizacion}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estatus),
                credentials: 'include',
            });

            if (response.ok) {
                if (estatus.estatus === 'APROBADA') {
                    enviarEmail();
                }
                alert(`Cotización actualizada a estado: ${estatus.estatus}`);
                let path = window.location.pathname;
                if (path === '/adminCotizacionDetallada.html') {
                    window.location.href = "/adminCotizaciones.html";
                } else {
                    window.location.href = "/cotizacion.html";
                }
            } else {
                alert('Error al actualizar la cotización');
            }
        } catch (error) {
            console.error('Error al actualizar la cotización:', error);
            alert('Error al actualizar la cotización');
        }
    });
});


const enviarEmail = () => {


    emailjs.init({
        publicKey: "RylHxdzXB-pCVWtWS",
    });


    const templateParams = {
        to_name: "Nombre del cliente", // Puedes reemplazar con un valor dinámico
        message: "La cotización ha sido aprobada.",
        reply_to: "daoma222@gmail.com", // Cambia según tu lógica
        from_name: "Sopl"
    };

    // Envía el correo con EmailJS
    emailjs.send("service_nvu4sii", "template_l546ncc", templateParams)
        .then((response) => {
            console.log("Correo enviado exitosamente!", response.status, response.text);
            alert("Correo de notificación enviado correctamente.");
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un problema al enviar el correo.", error);
        });

    alert("Hola");
};
