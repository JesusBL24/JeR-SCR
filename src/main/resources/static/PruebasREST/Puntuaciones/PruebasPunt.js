class Puntuacion{
    constructor() {
        this.id = null;
        this.puntuacion = null;
        this.posicion = null;
    }
}

var ip = location.host;
console.log(ip);

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
//$(obtener).click(puntuacionGET);

//PUT
//$(mandar).click(puntuacionPUT(nombre, numero));

function puntuacionPUT(nombre, pPuntuacion){
    console.log(nombre, pPuntuacion);
    //rellenar la variable usuario actualizado
    puntuacion.id = nombre //$(nombre).val();
    puntuacion.puntuacion = pPuntuacion //$(pPuntuacion).val();
    puntuacion.posicion = 5;

    //Petición AJAX
    $.ajax({
        type: "PUT",
        url: 'http://' + ip + '/puntuaciones',
        data: JSON.stringify(puntuacion),
        contentType: "app/json",
        success: function(response)
        {
            console.log(response);
        },
        error:function(error){
            console.log(error.responseText);
        }
    });
}

function puntuacionGETPruebas(){
    //console.log("Hola");
    //Petición Ajax
    $.ajax({
        type: "GET",
        url: 'http://' + ip + '/puntuaciones',
        success: function(loadPuntuaciones)
        {
            console.log(loadPuntuaciones);
            for (var i = 0; i < loadPuntuaciones.length; i++) {
                showPuntuacion(loadPuntuaciones[i]);
            }
        },
        error:function(error){
            console.log(error.responseText);
        }
    });
}


