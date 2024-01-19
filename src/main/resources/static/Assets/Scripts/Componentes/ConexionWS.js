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
    }

    //SI SE RECIBE UN MENSAJE
    conexion.onmessage = function(msg) {
        console.log("MENSAJE: " + msg.data);
        if(msg.data === "1" || msg.data === "2")
        {
            posicion = parseInt(msg.data)
        }else
        {
            //TODO
        }
    }

    //SI SE CIERRA LA CONEXION
    conexion.onclose = function() {
        console.log("CERRANDO CONEXIÓN CON EL SERVIDOR");
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
function mandarMensaje()
{
    if(conexion != null)
    {
        var otroJugador = (posicion == 1)?2:1;
        var mensaje = "Hola jugador " + otroJugador;
    }
        conexion.send(mensaje);
}