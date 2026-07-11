// Obtener usuarios guardados o crear un array vacío
let usuarios = JSON.parse(localStorage.getItem("usuarios_sgg")) || [];


// Guardar usuarios en LocalStorage
function guardarUsuarios(){

    localStorage.setItem(
        "usuarios_sgg",
        JSON.stringify(usuarios)
    );

}


// Buscar usuario por correo
function buscarUsuario(email){

    return usuarios.find(
        usuario => usuario.email === email
    );

}