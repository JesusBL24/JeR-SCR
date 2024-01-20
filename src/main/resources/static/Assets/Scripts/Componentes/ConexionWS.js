function abrirConexionWS() {

    //SI EXISTE UNA CONEXIÓN PREVIA, SE CIERRA
    if(conexion != null)
        cerrarConexionWS();

    console.log("CREANDO NUEVA CONEXION CON EL SERVIDOR");

    //SE CREA UNA NUEVA CONEXION
    conexion = new WebSocket('ws:' + ip + '/matchHandler');

    //SI OCURRE UN ERROR
    conexion.onerror = function(e) {
        console.log("ERROR AL CREAR EL WEBSOCKET: " + e);
        conexion = null;
    }

    //SI SE RECIBE UN MENSAJE
    conexion.onmessage = function(msg) {
        console.log("MENSAJE: " + msg.data);
        if(msg.data.includes("TiempoDeInicio"))
        {
            var atributos = msg.data.split(";");
            posicion = Number(atributos[1])
            tiempoParaEmpezar = Number(atributos[3]);
        }else
        {
            //TODO
        }
    }

    //SI SE CIERRA LA CONEXION
    conexion.onclose = function() {
        console.log("CERRANDO CONEXIÓN CON EL SERVIDOR");
        conexion = null;
    }
}

//CIERRA LA CONEXION
function cerrarConexionWS()
{
    if(conexion != null)
        conexion.close();
    conexion = null;
}

//FUNCIÓN PARA PROBAR LA CONEXION DESDE CONSOLA
function mandarMensaje(mensaje)
{
    if(conexion != null)
    {
        //var otroJugador = (posicion == 1)?2:1;
        //var mensaje = "Hola jugador " + otroJugador;
    }
        conexion.send(mensaje);
}