// Elementos del formulario

const formularioRecuperar =
document.getElementById("formRecuperar");


const passwordNueva =
document.getElementById("nuevaPassword");


const repetirPasswordNueva =
document.getElementById("repetirNuevaPassword");


const btnCambiar =
document.getElementById("btnCambiar");


// Requisitos de contraseña

let requisitosRecuperar = {

    longitud:false,
    mayuscula:false,
    minuscula:false,
    numero:false,
    especial:false

};


// Validación en tiempo real

passwordNueva.addEventListener("input", function(){

    let password = passwordNueva.value;


    requisitosRecuperar.longitud =
    password.length >= 8;


    requisitosRecuperar.mayuscula =
    /[A-Z]/.test(password);


    requisitosRecuperar.minuscula =
    /[a-z]/.test(password);


    requisitosRecuperar.numero =
    /[0-9]/.test(password);


    requisitosRecuperar.especial =
    /[!@#$%^&*]/.test(password);



    actualizarEstadoRecuperar();


});



// Actualizar lista visual

function actualizarEstadoRecuperar(){


    cambiarEstado(
        "longitud",
        requisitosRecuperar.longitud
    );


    cambiarEstado(
        "mayuscula",
        requisitosRecuperar.mayuscula
    );


    cambiarEstado(
        "minuscula",
        requisitosRecuperar.minuscula
    );


    cambiarEstado(
        "numero",
        requisitosRecuperar.numero
    );


    cambiarEstado(
        "especial",
        requisitosRecuperar.especial
    );



    btnCambiar.disabled =
    !Object.values(requisitosRecuperar).every(Boolean);

}



function cambiarEstado(id, cumple){


    let elemento =
    document.getElementById(id);


    if(cumple){

        elemento.innerHTML =
        "✅ " + elemento.innerHTML.substring(2);

        elemento.style.color="green";

    }else{

        elemento.innerHTML =
        "❌ " + elemento.innerHTML.substring(2);

        elemento.style.color="red";

    }

}



// Mostrar / ocultar contraseña

const verNuevaPassword =
document.getElementById("verNuevaPassword");


verNuevaPassword.addEventListener("click", function(){


    if(passwordNueva.type === "password"){

        passwordNueva.type="text";
        repetirPasswordNueva.type="text";

        verNuevaPassword.innerHTML=
        "🙈 Ocultar contraseña";


    }else{

        passwordNueva.type="password";
        repetirPasswordNueva.type="password";

        verNuevaPassword.innerHTML=
        "👁 Mostrar contraseña";

    }


});



// Cambiar contraseña

formularioRecuperar.addEventListener(
"submit",
function(e){

    e.preventDefault();

    let email =
    document.getElementById("emailRecuperar").value.trim();

    let formatoEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    if(!formatoEmail.test(email)){

    alert("Ingrese un correo electrónico válido");

    return;

}


    let usuario =
    buscarUsuario(email);



    if(!usuario){

        alert("No existe un usuario con ese correo");

        return;

    }



    if(usuario.password === passwordNueva.value){

        alert("La nueva contraseña no puede ser igual a la anterior");

        return;

    }



    if(passwordNueva.value !== repetirPasswordNueva.value){

        alert("Las contraseñas no coinciden");

        return;

    }



    usuario.password =
    passwordNueva.value;


    guardarUsuarios();



    alert("Contraseña actualizada correctamente");


    window.location.href="index.html";


});