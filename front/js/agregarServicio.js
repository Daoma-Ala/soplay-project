const form = document.getElementById('registrar');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:3000/api/v1/servicio', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            window.alert(`Servicio registrado con ID: ${data.id_servicio}`);
            window.location.reload();
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al registrar el servicio:', error);
        window.alert('Error al enviar el formulario.');

    }
});