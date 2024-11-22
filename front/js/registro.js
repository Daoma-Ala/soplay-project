const form = document.getElementById('registrar');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombres = form.elements['nombres'].value;
    const apellidoPaterno = form.elements['apellidoPaterno'].value;
    const apellidoMaterno = form.elements['apellidoMaterno'].value;
    const fechaNacimiento = form.elements['fechaNacimiento'].value;
    const telefono = form.elements['telefono'].value;
    const correo = form.elements['correo'].value;
    const password = form.elements['contrasena'].value;
    const genero = form.elements['gender'].value;

    if(!validateForm(nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, correo, password, genero)){
        return;
    }

    let sexoDB;
    switch(genero){
        case 'male':
            sexoDB = 'MASCULINO';
            break;
        case 'female':
            sexoDB = 'FEMENINO';
            break;
        case 'prefer_not_to_say':
            sexoDB = 'OTRO';
            break;
    }

    const requestData = {
        nombres: nombres,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        fecha_nacimiento: fechaNacimiento,
        telefono: telefono,
        correo: correo,
        password: password,
        sexo: sexoDB,
        tipo: 'CLIENTE'
    };

    try{
        const response = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content_Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if(response.ok){
            const data = await response.json();
            console.log(data);
            window.alert('Registro exitoso');
            window.location.href = '/iniciarSesion.html';
        }else{
            const errorData = await response.json();
            window.alert(`Error ${errorData.error || 'Hubo un problema al registrar el usuario'}`);
        }
    }catch(error){
        console.error('Error al registrar:', error);
        window.alert('Error al intentar registrar. Por favor, inténtalo más tarde.');
    }
});

function validateForm(nombres, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, correo, password, genero){
    if(!nombres || !apellidoPaterno || !apellidoMaterno || !fechaNacimiento || !telefono || !correo || !password || !genero){
        alert("Todos los campos son obligatorios");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(correo)){
        alert("Por favor ingrese un correo electrónico válido");
        return false;
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!fechaRegex.test(fechaNacimiento)){
        alert("El formato de fecha debe ser YYYY-MM-DD");
        return false;
    }

    if(password.length > 15){
        alert("La contraseña no puede tener más de 15 caracteres");
        return false;
    }if(password.includes(" ")){
        alert("La contraseña no puede contener espacios");
        return false;
    }

    const telefonoRegex = /^\d{10}$/;
    if(!telefonoRegex.test(telefono.replace(/[-\s]/g, ''))){
        alert("El número de teléfono debe contener 10 dígitos");
        return false;
    }

    return true;
}