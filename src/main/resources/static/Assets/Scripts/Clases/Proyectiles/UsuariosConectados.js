//////USUARIOS CONECTADOS

//AVISA DE QUE ALGUIEN NUEVO SE CONECTA
function avisarDeConexion() {
    $.ajax({
        type: "POST",
        url: 'http://' + ip + '/clientesConectados/conectar',
        success: function (response) {
            //console.log(response);
        },
        error: function (error) {
            //console.log(error);
        }
    });
}

//AVISA DE QUE ALGUIEN SE DESCONECTA
$(window).on("beforeunload", function() {

    //Petición AJAX
    $.ajax({
        type: "POST",
        url: 'http://' + ip +'/clientesConectados/desconectar',
        success: function(response)
        {
            console.log("Saliendo de la aplicación");
        },
        error:function(error){
            console.log(error);
        }
    });

});

//OBTIENE LOS USUARIOS CONECTADOS
function ObtenerUsuariosConectados(){
    $.ajax({
        type: "GET",
        url: 'http://' + ip +'/clientesConectados',
        success: function(response)
        {
            //console.log(response);
            if(usuariosConectados != null)
                usuariosConectados.text = "Usuarios conectados: " + response;
        },
        error:function(error){
            console.log(error);
        }
    });
}

avisarDeConexion();
setInterval(ObtenerUsuariosConectados, 500);