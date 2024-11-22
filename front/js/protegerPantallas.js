
const verificarAutenticacion = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/protected', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status ===200) {
            console.log("Usuario autenticado");
        } else {
            window.location.href = '/iniciarSesion.html';
        }
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        window.location.href = '/iniciarSesion.html';
    }
};

verificarAutenticacion();
