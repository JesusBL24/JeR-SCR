class Puntuacion{
    constructor() {
        this.nombre = null;
        this.puntuacion = null;
    }
}

var puntuacion = new Puntuacion();
var puntuaciones = [];


var nombre = document.getElementById("usuario");
var numero = document.getElementById("puntuacion");
var mandar = document.getElementById("mandarPuntuacion");
var obtener = document.getElementById("obtenerPuntuaciones");
var informacion = document.getElementById("información");

function showPuntuacion(puntuacionToShow) {

    $('#informacion').append("Posicion :" + puntuacionToShow.posicion + " Nombre: " + puntuacionToShow.id
        + " Puntuacion: "+ puntuacionToShow.posicion);
}
//GET
$(obtener).click(function() {

    //Petición Ajax
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/TablaPuntuaciones',
        success: function(loadPuntuaciones)
        {
            for (var i = 0; i < loadPuntuaciones.length; i++) {
                showPuntuacion(loadPuntuaciones[i]);
            }
        }
    });
});

//POST
$(mandar).click(function() {

    //rellenar la variable usuario actualizado
    puntuacion.nombre = $(nombre).val();
    puntuacion.puntuacion = $(numero).val();

    //Petición AJAX
    $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/TablaPuntuaciones',
        data: JSON.stringify(usuarios),
        contentType: "app/json",
        success: function(response)
        {
            console.log(response);
        },
        error:function(error){
            console.log(error.responseText);
        }
    });

});


