// Botón de cambio de tema
const btnTema = document.getElementById("btnTema");


// Cargar tema guardado al abrir la página
if(localStorage.getItem("tema") === "oscuro"){
    document.body.classList.add("dark");
}


// Cambiar tema
if(btnTema){

    btnTema.addEventListener("click", function(){

        document.body.classList.toggle("dark");


        // Guardar preferencia
        if(document.body.classList.contains("dark")){

            localStorage.setItem("tema", "oscuro");

        }else{

            localStorage.setItem("tema", "claro");

        }

    });

}