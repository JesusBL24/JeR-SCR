//variables para MENU PRINCIPAL
var desactivarBoton = false;
var sesionIniciada = false;

var ip = location.host;

//USUARIO
class Usuario{
    constructor() {
        this.nombre = null;
        this.password = null;
    }

    ofuscarContraseña(){
        if(this.password != null && this.password != '')
            this.password = md5(this.password);
        else
            this.password = null;
    }
}

var usuario = new Usuario();
usuario.nombre = "ANONIMO";

var puntuacion = 0;

var usuariosConectados = null;



class Puntuacion{
    constructor() {
        this.id = null;
        this.puntuacion = null;
        this.posicion = null;
    }
}
function showPuntuacion(puntuacionToShow) {

    $('#informacion').append("Posicion :" + puntuacionToShow.posicion + " Nombre: " + puntuacionToShow.id
        + " Puntuacion: "+ puntuacionToShow.posicion);
}