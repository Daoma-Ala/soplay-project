const form = document.getElementById('iniciar');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const correo = form.elements['correo'].value;
    const password = form.elements['password'].value;

    if (!validateForm(correo, password)) {
        return;
    }

    const requestData = {
        correo: correo,
        password: password
    };

    const formData = new FormData(form);
    console.log(formData.correo);
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

         
            if(data.rol === 'ENCARGADO'){
                window.location.href = '/administrador.html';
            }else if(data.rol === 'CLIENTE'){
                window.location.href = '/empleado.html';
            }
         
        } else {
            const errorData = await response.json();
            window.alert(`Error: ${errorData.error || 'Hubo un problema al iniciar sesión.'}`);

        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        window.alert('Error al intentar iniciar sesión. Por favor, inténtalo más tarde.');

    }
});


function validateForm() {
    // Obtener los valores de los campos
    const usuario = document.forms[0].elements["correo"].value;
    const password = document.forms[0].elements["password"].value;

    // Validar el nombre de usuario (no vacío)
    if (usuario === "") {
        alert("El correo del usuario es obligatorio");
        return false;
    }

    // Validar la contraseña (no vacía)
    if (password === "") {
        alert("La contraseña es obligatoria");
        return false;
    }

    // Validar longitud de la contraseña (máximo 15 caracteres)
    if (password.length > 15) {
        alert("La contraseña no puede tener más de 15 caracteres");
        return false;
    }

    // Validar que la contraseña no contenga espacios
    if (password.includes(" ")) {
        alert("La contraseña no puede contener espacios");
        return false;
    }

    // Si todas las validaciones pasan, retorna true para permitir el envío del formulario
    return true;
}