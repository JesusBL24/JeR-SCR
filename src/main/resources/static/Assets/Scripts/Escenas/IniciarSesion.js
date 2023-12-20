class IniciarSesion extends Phaser.Scene{
    constructor(props)
    {
        super({key: 'IniciarSesion'});
    }

    preload(){
        //cargamos html
        this.load.html("usuarioTXT","UsuarioPopUp.html");
        this.load.html("contrTXT","ContrPopUp.html");

        //se cargan las imagenes
        this.load.image('fondoIniSes','Assets/Sprites/Menus/IniciarSesion.png');
        this.load.spritesheet('botonEnviar','Assets/Sprites/Menus/EnviarSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonCerrar','Assets/Sprites/Menus/CruzSpriteSheet.png',{frameWidth: 500,frameHeight: 500});

        //cargamos imagenes de feedback pop-up
        this.load.image('usuarioCreado','Assets/Sprites/Menus/Pop-up_mensajes/UsuarioCreado.png');
        this.load.image('contrIncorrecta','Assets/Sprites/Menus/Pop-up_mensajes/ContrasenaIncorrecta.png');
        this.load.image('bienvenido','Assets/Sprites/Menus/Pop-up_mensajes/Bienvenido.png');
    }

    create(){

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoIniSes').setScale(0.6, 0.58).setOrigin(0,0);


        ////////////////
        //HTML ADD DOM//
        ////////////////

        //generamos el dom de cada elemento de input text
        this.createDom();

        ////SI NO SE USA ELIMINAR ESTA SECCION HASTA BOTONES
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.on("down", event => {
            let name = this.usuarioInput.getChildByName("usuario");
            /*if(name.value != "") {
                this.message.setText("Hello, " + name.value);
                name.value = "";
            }*/

        });


        ///////////
        //BOTONES//
        ///////////

        var botEnviar = this.add.sprite(850,575,'botonEnviar').setScale(0.125,0.125).setInteractive();
        var botCerrar = this.add.sprite(925,300,'botonCerrar').setScale(0.09,0.09).setInteractive();


        ///////////////////////////
        //FUNCIONALIDADES BOTONES//
        ///////////////////////////

        //funcionalidad boton CERRAR
        ////////////////////////////
        botCerrar.on('pointerover',()=>{
            botCerrar.setFrame(1);
        });
        botCerrar.on('pointerout',()=>{
            botCerrar.setFrame(0);
        });
        botCerrar.on('pointerdown',()=>{
            //destruimos el dom para ocultarlo
            this.usuarioInput.destroy();
            this.contrInput.destroy();
            //despausamos el menu inicial para poder usarlo y escondemos el pop-up
            this.scene.setVisible(false,'IniciarSesion');
            this.scene.resume('MenuInicial');
            this.scene.stop('IniciarSesión');
        });


        //GENERA UN NUEVO USUARIO CON UN POST
        function nuevoUsuario(nuevoUsuario){
            //Petición AJAX
            $.ajax({
                type: "POST",
                url: 'http://localhost:8080/usuario',
                data: JSON.stringify(nuevoUsuario),
                contentType: "app/json",
                success: function(response)
                {
                    console.log(response);
                    //SESION INICIADA
                    sesionIniciada = true;
                    usuario = nuevoUsuario;
                },
                error:function(error){
                    console.log(error.responseText);
                    usuario.nombre = "ANONIMO";
                    usuario.password = null;
                }
            });
        }

        //funcionalidad boton ENVIAR
        ////////////////////////////
        botEnviar.on('pointerover',()=>{
            botEnviar.setFrame(1);
        });
        botEnviar.on('pointerout',()=>{
            botEnviar.setFrame(0);
        });

        botEnviar.on('pointerdown',()=>{
            var boton = this;

            //GENERAMOS UN USUARIO TEMPORAL
            var uTemporal = new Usuario();
            uTemporal.nombre = $("#usu").val();
            uTemporal.password = $("#contr").val();
            uTemporal.ofuscarContraseña();

            //destruimos el dom para ocultarlo
            this.usuarioInput.destroy();
            this.contrInput.destroy();

            //creamos imagen feedback
            var usuarioCreado = this.add.image(0,0,'usuarioCreado').setScale(0.6, 0.58).setOrigin(0,0);
            var contrIncorrecta = this.add.image(0,0,'contrIncorrecta').setScale(0.6, 0.58).setOrigin(0,0);
            var bienvenido = this.add.image(0,0,'bienvenido').setScale(0.6, 0.58).setOrigin(0,0);

            //dependiendo de si ha entrado con cuenta existente bien, creando nueva cuenta o
            //intenta crear cuenta que ya existe

            $.ajax({
                type: "GET",
                url: 'http://'+ip+'/usuario',
                headers: {'usuario': JSON.stringify(uTemporal)},
                success: function(response)
                {
                    console.log(response);
                    if(response == "CREAR NUEVO USUARIO")
                    {
                        nuevoUsuario(uTemporal);
                        usuarioCreado.visible = true;
                        contrIncorrecta.visible = false;
                        bienvenido.visible = false;
                    }
                    else{
                        //SESIÓN INICIADA
                        sesionIniciada = true;
                        usuarioCreado.visible = false;
                        contrIncorrecta.visible = false;
                        bienvenido.visible = true;
                        usuario = uTemporal;
                    }

                    //variable globar para indicar en Menu Inicial qué boton debe estar activo inicialmente
                    desactivarBoton = true;

                    //tras un delay de tiempo, quitamos el pop-up
                    boton.time.delayedCall(2000, function (){
                        //activamos/desactivamos los botones necesarios
                        boton.scene.get('MenuInicial').botIniSes.visible = false;
                        boton.scene.get('MenuInicial').botOpciones.visible = true;
                        //ocultamos feedback
                        usuarioCreado.visible = false;
                        bienvenido.visible = false;
                        //despausamos el menu inicial para poder usarlo y escondemos el pop-up
                        boton.scene.setVisible(false,'IniciarSesion');
                        boton.scene.resume('MenuInicial');
                        boton.scene.stop('IniciarSesión');
                    }, [], boton);
                },
                error:function(error){
                    console.log(error.responseText);
                    //activar el boton
                    usuarioCreado.visible = false;
                    contrIncorrecta.visible = true;
                    bienvenido.visible = false;

                    //tras un delay de tiempo, quitamos el feedback pero permanecemos en pop-up
                    boton.time.delayedCall(2000, function (){
                        //ocultamos feedback
                        contrIncorrecta.visible = false;

                        //volvemos a generar el dom de cada elemento de input text
                        boton.createDom();
                    }, [], boton);
                    usuario.nombre = "ANONIMO";
                    usuario.password = null;
                }
            });
        });

    }



    //funcion que nos crea el dominio de los input text
    createDom(){
        this.contrInput = this.add.dom(window.innerWidth/1.85, window.innerHeight/1.85).createFromCache("usuarioTXT");
        this.usuarioInput = this.add.dom(window.innerWidth/1.75, window.innerHeight/1.5).createFromCache("contrTXT");
    }
}
