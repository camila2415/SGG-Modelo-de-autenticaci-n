const formularioLogin = document.getElementById("formLogin");

const emailLogin = document.getElementById("email");
const passwordLogin = document.getElementById("password");

const verPassword = document.getElementById("verPassword");

const btnIngresar = document.getElementById("btnIngresar");


// Mostrar / ocultar contraseña

verPassword.addEventListener("click", function(){

    if(passwordLogin.type === "password"){

        passwordLogin.type = "text";
        verPassword.innerHTML = "🙈 Ocultar contraseña";

    }else{

        passwordLogin.type = "password";
        verPassword.innerHTML = "👁 Mostrar contraseña";

    }

});


// Control de intentos fallidos

let intentosFallidos = 0;


// Inicio de sesión

formularioLogin.addEventListener("submit", function(e){

    e.preventDefault();


    let email = emailLogin.value.trim();
    let password = passwordLogin.value;


    let usuarioEncontrado = buscarUsuario(email);



    if(!usuarioEncontrado){

        alert("El usuario no existe");
        return;

    }



    if(usuarioEncontrado.password !== password){

        intentosFallidos++;

        alert("Contraseña incorrecta");


        if(intentosFallidos >= 3){

            btnIngresar.disabled = true;

            alert("Demasiados intentos. Espere 30 segundos.");


            setTimeout(function(){

                btnIngresar.disabled = false;
                intentosFallidos = 0;

            },30000);

        }


        return;

    }



    intentosFallidos = 0;


    alert("Inicio de sesión correcto");


});