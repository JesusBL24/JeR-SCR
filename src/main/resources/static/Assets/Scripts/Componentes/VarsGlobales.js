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
        if(this.password != '')
            this.password = md5(this.password);
    }
}

var usuario = new Usuario();