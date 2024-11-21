/*
const verificarAutenticacion = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/protected', {
            method: 'GET',
        });

        if (!response.ok) {
            window.location.href = '/iniciarSesion.html';
        } else {
            console.log("Usuario autenticado");
        }
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        window.location.href = '/iniciarSesion.html';
    }
};

verificarAutenticacion();
*/