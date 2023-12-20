class OpcionesAPI extends Phaser.Scene{
    constructor(props)
    {
        super({key: 'OpcionesAPI'});
    }

    preload(){
        //cargamos html
        this.load.html("usuarioTXT","UsuarioPopUp.html");
        this.load.html("contrTXT","ContrPopUp.html");

        //se cargan las imagenes
        this.load.image('fondoOpc','Assets/Sprites/Menus/OpcionesUsuario.png');
        this.load.spritesheet('botonCerSes','Assets/Sprites/Menus/CerrarSesSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonActualizar','Assets/Sprites/Menus/ActualizarSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonBorrar','Assets/Sprites/Menus/BorrarSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonCerrar','Assets/Sprites/Menus/CruzSpriteSheet.png',{frameWidth: 500,frameHeight: 500});

        //cargamos imagenes de mensajes pop-up
        this.load.image('cuentaBorrada','Assets/Sprites/Menus/Pop-up_mensajes/CuentaBorrada.png');
        this.load.image('logOut','Assets/Sprites/Menus/Pop-up_mensajes/SesionCerrada.png');
        this.load.image('cuentaNoExiste','Assets/Sprites/Menus/Pop-up_mensajes/CuentaNoExiste.png');
        this.load.image('cuentaActualizada','Assets/Sprites/Menus/Pop-up_mensajes/CuentaActualizada.png');
    }

    create(){

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoOpc').setScale(0.6, 0.58).setOrigin(0,0);


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

        var botCerSes = this.add.sprite(400,575,'botonCerSes').setScale(0.125,0.125).setInteractive();
        var botActualizar = this.add.sprite(800,575,'botonActualizar').setScale(0.125,0.125).setInteractive();
        var botBorrar = this.add.sprite(600,575,'botonBorrar').setScale(0.125,0.125).setInteractive();
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
            this.scene.setVisible(false,'OpcionesAPI');
            this.scene.resume('MenuInicial');
        });


        //funcionalidad boton LOG OUT
        /////////////////////////////
        botCerSes.on('pointerover',()=>{
            botCerSes.setFrame(1);
        });
        botCerSes.on('pointerout',()=>{
            botCerSes.setFrame(0);
        });
        botCerSes.on('pointerdown',()=>{
            //destruimos el dom para ocultarlo
            this.usuarioInput.destroy();
            this.contrInput.destroy();

            //creamos imagen feedback
            var logOut = this.add.image(0,0,'logOut').setScale(0.6, 0.58).setOrigin(0,0);

            //variable global para indicar en Menu Inicial qué boton debe estar activo inicialmente
            desactivarBoton = false;

            //tras un delay de tiempo, quitamos el pop-up
            this.time.delayedCall(2000, function (){
                //activamos/desactivamos los botones necesarios
                this.scene.get('MenuInicial').botIniSes.visible = true;
                this.scene.get('MenuInicial').botOpciones.visible = false;
                //ocultamos feedbacks
                logOut.visible = false;
                //despausamos el menu inicial para poder usarlo y escondemos el pop-up
                this.scene.setVisible(false,'OpcionesAPI');
                this.scene.resume('MenuInicial');
            }, [], this);
        });


        //funcionalidad boton BORRAR
        ////////////////////////////
        botBorrar.on('pointerover',()=>{
            botBorrar.setFrame(1);
        });
        botBorrar.on('pointerout',()=>{
            botBorrar.setFrame(0);
        });
        botBorrar.on('pointerdown',()=>{
            //destruimos el dom para ocultarlo
            this.usuarioInput.destroy();
            this.contrInput.destroy();

            //creamos imagen feedback
            var cuentaBorrada = this.add.image(0,0,'cuentaBorrada').setScale(0.6, 0.58).setOrigin(0,0);

            //variable global para indicar en Menu Inicial qué boton debe estar activo inicialmente
            desactivarBoton = false;

            //tras un delay de tiempo, quitamos el pop-up
            this.time.delayedCall(2000, function (){
                //activamos/desactivamos los botones necesarios
                this.scene.get('MenuInicial').botIniSes.visible = true;
                this.scene.get('MenuInicial').botOpciones.visible = false;
                //destruimos la imagen
                cuentaBorrada.visible = false;
                //despausamos el menu inicial para poder usarlo y escondemos el pop-up
                this.scene.setVisible(false,'OpcionesAPI');
                this.scene.resume('MenuInicial');
            }, [], this);
        });


        //funcionalidad boton ACTUALIZAR
        ////////////////////////////////
        botActualizar.on('pointerover',()=>{
            botActualizar.setFrame(1);
        });
        botActualizar.on('pointerout',()=>{
            botActualizar.setFrame(0);
        });
        botActualizar.on('pointerdown',()=>{
            //destruimos el dom para ocultarlo
            this.usuarioInput.destroy();
            this.contrInput.destroy();

            //creamos imagen feedback
            var actulizadoBien = this.add.image(0,0,'cuentaActualizada').setScale(0.6, 0.58).setOrigin(0,0);
            var actulizadoMal = this.add.image(0,0,'cuentaNoExiste').setScale(0.6, 0.58).setOrigin(0,0);

            //segun si se actualiza bien la cuenta o no
            if(desactivarBoton == true){
                ////////////////////
                //ACTUALIZADO BIEN//
                ////////////////////
                actulizadoBien.visible = true;
                actulizadoMal.visible = false;

                //tras un delay de tiempo quitamos el feedback pero permanecemos en pop-up
                this.time.delayedCall(2000, function (){
                    //ocultamos la imagen
                    actulizadoBien.visible = false;
                    //volvemos a generar el dom de cada elemento de input text
                    this.createDom();
                }, [], this);
            }else{
                ///////////////////
                //ACTUALIZADO MAL//
                ///////////////////
                actulizadoBien.visible = false;
                actulizadoMal.visible = true;

                //tras un delay de tiempo quitamos el feedback pero permanecemos en pop-up
                this.time.delayedCall(2000, function (){
                    //ocultamos la imagen
                    actulizadoMal.visible = false;
                    //volvemos a generar el dom de cada elemento de input text
                    this.createDom();
                }, [], this);
            }
        });

    }

    //funcion que nos crea el dominio de los input text
    createDom(){
        this.contrInput = this.add.dom(window.innerWidth/1.85, window.innerHeight/1.85).createFromCache("usuarioTXT");
        this.usuarioInput = this.add.dom(window.innerWidth/1.75, window.innerHeight/1.5).createFromCache("contrTXT");
    }

}