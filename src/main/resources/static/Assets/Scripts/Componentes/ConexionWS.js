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
        //console.log("MENSAJE: " + msg.data);
        if(msg.data.includes("TiempoDeInicio"))
        {
            var atributos = msg.data.split(";");
            posicion = Number(atributos[1])
            tiempoParaEmpezar = Number(atributos[3]);
        }
        if(msg.data.includes("Movimiento"))
        {
            var atributos = msg.data.split(";");
            //console.log("Movimiento: " + atributos[1] + ", "+ atributos[2] + ", " + atributos[3] + ", " + atributos[4]);
            if(posicion == 1){
                escenaOnline.nave2.RecibirMovimientoOnline(atributos[1] === "true", atributos[2] === "true"
                    , atributos[3]=== "true", atributos[4] === "true");
            }else{
                escenaOnline.nave1.RecibirMovimientoOnline(atributos[1] === "true", atributos[2] === "true"
                    , atributos[3]=== "true", atributos[4] === "true");
            }
        }
        if(msg.data.includes("Disparo"))
        {
            var atributos = msg.data.split(";");
            //console.log("MENSAJE DE DISPARO: " + atributos[1]);
            if(posicion == 1) {
                escenaOnline.nave2.RecibirDisparoOnline(atributos[1] === "true");
            }else{
                escenaOnline.nave1.RecibirDisparoOnline(atributos[1] === "true");
            }

        }
        if(msg.data.includes("Booster")) {
            //console.log("Booster: " + msg.data);
            var atributos = msg.data.split(";");   
            if(posicion == 1){
                escenaOnline.nave2.RecibirBoosterOnline(atributos[1], Number(atributos[3]));
            }else{
                escenaOnline.nave1.RecibirBoosterOnline(atributos[1], Number(atributos[3]));
            }
        }
        if(msg.data.includes("SyncNaves"))
        {
            if(posicion == 2)
            {
                var atributos = msg.data.split(";");
                var objetos = JSON.parse(atributos[1]);
                //console.log(objetos);
                escenaOnline.nave1.cuerpo.x = objetos[0][0];
                escenaOnline.nave1.cuerpo.y = objetos[0][1];
                escenaOnline.nave1.cuerpo.rotation = objetos[0][2];
                escenaOnline.nave1.cuerpo.body.setVelocity(objetos[1][3].x, objetos[1][3].y);
                escenaOnline.nave2.cuerpo.x = objetos[1][0];
                escenaOnline.nave2.cuerpo.y = objetos[1][1];
                escenaOnline.nave2.cuerpo.rotation = objetos[1][2];
                escenaOnline.nave2.cuerpo.body.setVelocity(objetos[1][3].x, objetos[1][3].y);

            }
        }
        if(msg.data.includes("SyncMeteoritos"))
        {
            var atributos = msg.data.split(";");
            var objetos = JSON.parse(atributos[1]);
            for(var i = 0; i < escenaOnline.mapa.cuerposMeteoritos.length; i++) {
                if(objetos[i] != null && escenaOnline.mapa.cuerposMeteoritos[i].body !== undefined)
                {
                    escenaOnline.mapa.cuerposMeteoritos[i].x = objetos[i][0];
                    escenaOnline.mapa.cuerposMeteoritos[i].y = objetos[i][1];
                    escenaOnline.mapa.cuerposMeteoritos[i].rotation = objetos[i][2];
                    escenaOnline.mapa.cuerposMeteoritos[i].body.setVelocity(objetos[i][3].x, objetos[i][3].y);
                }
            }
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
        conexion.send(mensaje);
    }
}