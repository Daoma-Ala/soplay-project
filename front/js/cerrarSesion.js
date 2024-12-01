
const logoutButton = document.getElementById('logoutButton');

const cerrarSesion = async () => {
    try {

        const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            console.log("Sesión cerrada correctamente");
            window.location.href = '/iniciarSesion.html'; 
        } else {
            console.error("Error al cerrar sesión");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud de cierre de sesión:", error);
    }
};

logoutButton.addEventListener('click', cerrarSesion);



