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

//VARIABLES WEBSOCKETS/////

var conexion = null;

//SI EL EQUIPO LOCAL ES EL JUGADOR 1 O EL 2
var posicion = null;

//MOMENTO EN EL QUE INICIAR LA PARTIDA
var tiempoParaEmpezar = 0;

//EscenaOnline
var escenaOnline = null;

//CONTADORES PARA LOS MENSAJE
var movimientoRecibido = -1;
var movimientoEnviado = 0;

var disparoRecibido = -1;
var disparoEnviado = 0;

var boosterEscudoRecibido = -1;
var boosterEscudoEnviado = 0;

var boosterMunicionRecibido = -1;
var boosterMunicionEnviado = 0;

var boosterVelocidadRecibido = -1;
var boosterVelocidadEnviado = 0;

var syncNavesRecibido = -1;
var syncNavesEnviado = 0;

var syncMeteoritosRecibido = -1;
var syncMeteoritosEnviado = 0;

///////////////////////////