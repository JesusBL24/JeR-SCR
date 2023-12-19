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

var login = document.getElementById("login");
var logout = document.getElementById("logout");
var actualizar = document.getElementById("actualizar");
var borrar = document.getElementById("borrar");

var nombre = document.getElementById("usuario");
var password = document.getElementById("contraseña");

var loggedIn = false;

$(logout).attr("disabled", true);
$(actualizar).attr("disabled", true);
$(borrar).attr("disabled", true);

//GET
$(login).click(function() {
    //desactivar el boton
    $(login).attr("disabled", true);

    //rellenar la variable usuario
    usuario.nombre = $(nombre).val();
    usuario.password = $(password).val();
    usuario.ofuscarContraseña();

    //Petición Ajax
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/usuario',
        headers: {'usuario': JSON.stringify(usuario)},
        success: function(response)
        {
            console.log(response);
            if(response == "CREAR NUEVO USUARIO")
            {
                nuevoUsuario();
            }
            else{
                //SESIÓN INICIADA
                loggedIn = true;
                $(logout).attr("disabled", !loggedIn);
                $(actualizar).attr("disabled", !loggedIn);
                $(borrar).attr("disabled", !loggedIn);
            }
        },
        error:function(error){
            console.log(error.responseText);
            //activar el boton
            $(login).attr("disabled", false);
            usuario.nombre = null;
            usuario.password = null;
        }
    });
});

//POST
function nuevoUsuario(){
    //Petición AJAX
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/usuario',
        data: JSON.stringify(usuario),
        contentType: "app/json",
        success: function(response)
        {
            console.log(response);
            //SESION INICIADA
            loggedIn = true;
            $(logout).attr("disabled", !loggedIn);
            $(actualizar).attr("disabled", !loggedIn);
            $(borrar).attr("disabled", !loggedIn);
        },
        error:function(error){
            console.log(error.responseText);
            //activar el boton
            $(login).attr("disabled", false);
            usuario.nombre = null;
            usuario.password = null;
        }
    });
}

$(actualizar).click(function() {
    //desactivar el boton
    $(logout).attr("disabled", true);
    $(actualizar).attr("disabled", true);
    $(borrar).attr("disabled", true);

    //rellenar la variable usuario actualizado
    var usuarioActualizado = new Usuario();
    usuarioActualizado.nombre = $(nombre).val();
    usuarioActualizado.password = $(password).val();
    usuarioActualizado.ofuscarContraseña();
    //ARRAY CON EL USUARIO Y EL USUARIO ACTUALIZADO
    var usuarios = [usuario,usuarioActualizado];

    //Petición AJAX
    $.ajax({
        type: "PUT",
        url: 'http://localhost:8080/usuario',
        data: JSON.stringify(usuarios),
        contentType: "app/json",
        success: function(response)
        {
            console.log(response);
            $(logout).attr("disabled", !loggedIn);
            $(actualizar).attr("disabled", !loggedIn);
            $(borrar).attr("disabled", !loggedIn);
            usuario.nombre = usuarioActualizado.nombre;
            usuario.password = usuarioActualizado.password;
        },
        error:function(error){
            console.log(error.responseText);
            //activar el boton
            $(logout).attr("disabled", !loggedIn);
            $(actualizar).attr("disabled", !loggedIn);
            $(borrar).attr("disabled", !loggedIn);
            $(nombre).val(usuario.nombre);
        }
    });

});

//DELETE
$(borrar).click(function() {
    //desactivar el boton
    $(logout).attr("disabled", true);
    $(actualizar).attr("disabled", true);
    $(borrar).attr("disabled", true);

    //Petición Ajax
    $.ajax({
        type: "DELETE",
        url: 'http://localhost:8080/usuario',
        headers: {'usuario': JSON.stringify(usuario)},
        success: function(response)
        {
            console.log(response);
            loggedIn = false;
            $(logout).attr("disabled", !loggedIn);
            $(actualizar).attr("disabled", !loggedIn);
            $(borrar).attr("disabled", !loggedIn);
            $(login).attr("disabled", loggedIn);
            usuario.nombre = null;
            usuario.password = null;
            $(nombre).val('');
            $(password).val('');
        },
        error:function(error){
            console.log(error.responseText);
            //activar los botones
            $(logout).attr("disabled", !loggedIn);
            $(actualizar).attr("disabled", !loggedIn);
            $(borrar).attr("disabled", !loggedIn);
        }
    });
});

//LOG OUT
$(logout).click(function() {
    console.log("Cerrando sesión");

    //botones
    $(logout).attr("disabled", true);
    $(actualizar).attr("disabled", true);
    $(borrar).attr("disabled", true);
    $(login).attr("disabled", false);

    //rellenar la variable usuario
    usuario.nombre = null;
    usuario.password = null;

    $(nombre).val('');
    $(password).val('');

    //quitar la variable loggedin
    loggedIn = false;
});
