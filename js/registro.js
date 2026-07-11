const formularioRegistro = document.getElementById("formRegistro");

const passwordRegistro = document.getElementById("passwordRegistro");
const repetirPassword = document.getElementById("repetirPassword");

const btnRegistrar = document.getElementById("btnRegistrar");

let requisitos = {
    longitud:false,
    mayuscula:false,
    minuscula:false,
    numero:false,
    especial:false
};


// Validación contraseña

passwordRegistro.addEventListener("input", function(){

    let password = passwordRegistro.value;

    requisitos.longitud = password.length >= 8;
    requisitos.mayuscula = /[A-Z]/.test(password);
    requisitos.minuscula = /[a-z]/.test(password);
    requisitos.numero = /[0-9]/.test(password);
    requisitos.especial = /[!@#$%^&*]/.test(password);

    actualizarRequisitos();

});


function actualizarRequisitos(){

    cambiarEstado("longitud", requisitos.longitud);
    cambiarEstado("mayuscula", requisitos.mayuscula);
    cambiarEstado("minuscula", requisitos.minuscula);
    cambiarEstado("numero", requisitos.numero);
    cambiarEstado("especial", requisitos.especial);

    btnRegistrar.disabled =
    !Object.values(requisitos).every(Boolean);

}


function cambiarEstado(id, cumple){

    let elemento = document.getElementById(id);

    if(cumple){
        elemento.innerHTML =
        "✅ " + elemento.innerHTML.substring(2);
        elemento.style.color="green";
    }
    else{
        elemento.innerHTML =
        "❌ " + elemento.innerHTML.substring(2);
        elemento.style.color="red";
    }

}



// Mostrar contraseña

document.getElementById("verPasswordRegistro")
.addEventListener("click", function(){

    if(passwordRegistro.type==="password"){

        passwordRegistro.type="text";
        repetirPassword.type="text";

        this.innerHTML="🙈 Ocultar contraseña";

    }else{

        passwordRegistro.type="password";
        repetirPassword.type="password";

        this.innerHTML="👁 Mostrar contraseña";

    }

});



// Registrar usuario

formularioRegistro.addEventListener("submit", function(e){

    e.preventDefault();


    let nombre =
    document.getElementById("nombre").value.trim();


    let apellido =
    document.getElementById("apellido").value.trim();


    let fecha =
    document.getElementById("fecha").value;



    // Validación nombre y apellido

    let soloLetras =
    /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;


    if(!soloLetras.test(nombre)){

        alert("El nombre solo puede contener letras");
        return;

    }


    if(!soloLetras.test(apellido)){

        alert("El apellido solo puede contener letras");
        return;

    }



    // Validación edad

    let nacimiento = new Date(fecha);
    let hoy = new Date();


    let edad =
    hoy.getFullYear() - nacimiento.getFullYear();


    let diferenciaMes =
    hoy.getMonth() - nacimiento.getMonth();


    if(
    diferenciaMes < 0 ||
    (diferenciaMes === 0 &&
    hoy.getDate() < nacimiento.getDate())
    ){

        edad--;

    }


    if(edad < 14){

        alert("Debes tener al menos 14 años");
        return;

    }



    if(passwordRegistro.value !== repetirPassword.value){

        alert("Las contraseñas no coinciden");
        return;

    }

    let email =
    document.getElementById("emailRegistro").value.trim();

    let formatoEmail=
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if(!formatoEmail.test(email)){
     
        alert("ingrese un correo electronico válido");
       
        return;
    }

    let nuevoUsuario = {

        nombre:nombre,
        apellido:apellido,
        fecha:fecha,

        email: email,

        password:
        passwordRegistro.value

    };



    if(buscarUsuario(nuevoUsuario.email)){

        alert("El correo ya está registrado");
        return;

    }



    usuarios.push(nuevoUsuario);

    guardarUsuarios();


    alert("Usuario registrado correctamente");


    window.location.href="index.html";


});