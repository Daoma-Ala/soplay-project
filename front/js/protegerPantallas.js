import { permisosPorPagina } from "./config.js";


const verificarAutenticacion = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/protected', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status === 200) {
            const rolUsuario = await response.json();

            const rutaActual = window.location.pathname;
            const rolesPermitidos = permisosPorPagina[rutaActual] || [];

            if (rolesPermitidos.includes(rolUsuario)) {
                console.log("Acceso permitido para el rol:", rolUsuario);
             
            } else {
                console.log(rolUsuario);
                if (rolUsuario === "ENCARGADO") {
                    window.location.href = '/administrador.html';
                } else if (rolUsuario === "CLIENTE" && window.location.pathname !== '/cliente.html') {
                    window.location.href = '/cliente.html';
                }
                return;
            }
        } else {
            if (window.location.pathname !== '/iniciarSesion.html') {
                window.location.href = '/iniciarSesion.html';
            }
            return;
        }
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        window.location.href = '/iniciarSesion.html';
    }
};

await verificarAutenticacion();
