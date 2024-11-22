const form = document.getElementById('registrar');


form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const nombres = form.elements['nombres'].value;
    const apellidoPaterno = form.elements['apellidoPaterno'].value;
    const apellidoMaterno = form.elements['apellidoMaterno'].value;
    const fechaNacimiento = form.elements['fechaNacimiento'].value;
    const telefono = form.elements['telefono'].value;
    const correo = form.elements['correo'].value; // Corrige el nombre
    const contrasena = form.elements['contrasena'].value;
    const sexo = form.elements['gender'].value;

    console.log({ nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, correo, contrasena, sexo });

   
    const requestData = {
        nombres: nombres,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        fecha_nacimiento: fechaNacimiento,
        telefono: telefono,
        correo: correo,
        password: contrasena,
        sexo: sexo.toUpperCase()
    };

    try {
        const request = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
            credentials: 'include',
        });

        if (request.ok) {
            const data = await request.json();
            console.log(data);
            window.alert(`Usuario registrado con éxito.`);
        } else {
            const errorData = await request.json();
            window.alert(`Error: ${errorData.error || 'Hubo un problema al registrarse'}`);
        }

    } catch (error) {
        console.error('Error al registrarse', error);
        window.alert('Error al intentar registrarse. Por favor, inténtalo más tarde.');
    }

});

function validateForm(nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, correo, contrasena, sexo) {
    if (nombres === "") {
        alert("El nombre es obligatorio");
        return false;
    } if (apellidoPaterno === "") {
        alert("El apellido paterno es obligatorio");
        return false;
    } if (apellidoMaterno === "") {
        alert("El apellido materno es obligatorio");
        return false;
    } if (telefono === "") {
        alert("El teléfono es obligatorio");
        return false;
    } if (correo === "") {
        alert("El correo del usuario es obligatorio");
        return false;
    } if (contrasena === "") {
        alert("La contraseña es obligatoria");
        return false;
    } if (contrasena.length > 15) {
        alert("La contraseña no puede tener más de 15 caracteres");
        return false;
    } if (contrasena.includes(" ")) {
        alert("La contraseña no puede contener espacios");
        return false;
    } if (sexo === "") {
        alert("El género es obligatorio");
        return false;
    }

    return true;
}