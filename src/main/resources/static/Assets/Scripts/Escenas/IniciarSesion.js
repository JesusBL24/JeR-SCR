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
        this.contrInput = this.add.dom(window.innerWidth/1.85, window.innerHeight/1.85).createFromCache("usuarioTXT");
        this.usuarioInput = this.add.dom(window.innerWidth/1.75, window.innerHeight/1.5).createFromCache("contrTXT");

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
        });

        //funcionalidad boton ENVIAR
        botEnviar.on('pointerover',()=>{
            botEnviar.setFrame(1);
        });
        botEnviar.on('pointerout',()=>{
            botEnviar.setFrame(0);
        });
        botEnviar.on('pointerdown',()=>{
            //variable globar para indicar en Menu Inicial qué boton debe estar activo inicialmente
            desactivarBoton = true;
            //activamos/desactivamos los botones necesarios
            this.scene.get('MenuInicial').botIniSes.visible = false;
            this.scene.get('MenuInicial').botOpciones.visible = true;
            //destruimos el dom para ocultarlo
            this.usuarioInput.destroy();
            this.contrInput.destroy();
            //despausamos el menu inicial para poder usarlo y escondemos el pop-up
            this.scene.setVisible(false,'IniciarSesion');
            this.scene.resume('MenuInicial');
        });

    }
}