class MenuInicial extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuInicial', active: true});

        //botones a los que accedemos desde otras escenas
        this.botIniSes;
        this.botOpciones;
    }

    preload(){
        //se cargan las imagenes
        this.load.image('fondoMI','Assets/Sprites/Menus/MenuInicial.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.load.spritesheet('botonStart','Assets/Sprites/Menus/StartSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonControles','Assets/Sprites/Menus/ControlesSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonCreditos','Assets/Sprites/Menus/CreditosSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonResultados','Assets/Sprites/Menus/ResultadosSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonIniSes','Assets/Sprites/Menus/IniciarSesSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('botonOpciones','Assets/Sprites/Menus/OpcionesSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoMI').setScale(0.6, 0.58).setOrigin(0,0);
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);


        ///////////
        //BOTONES//
        ///////////

        var botStart = this.add.sprite(850,300,'botonStart').setScale(0.2,0.2).setInteractive();
        var botControles = this.add.sprite(850,400,'botonControles').setScale(0.2,0.2).setInteractive();
        var botResultados = this.add.sprite(850,500,'botonResultados').setScale(0.2,0.2).setInteractive();
        var botCreditos = this.add.sprite(850,600,'botonCreditos').setScale(0.2,0.2).setInteractive();
        this.botIniSes = this.add.sprite(100,650,'botonIniSes').setScale(0.125,0.125).setInteractive();
        this.botOpciones = this.add.sprite(100,650,'botonOpciones').setScale(0.125,0.125).setInteractive();

        //dependiendo de lo guardado segun otras escenas, se presenta un boton u otro al iniciar el menu inicial
        if(desactivarBoton == false){
            //cuando no nos hemos logeado
            this.botOpciones.visible = false;
            this.botIniSes.visible = true;
        }else{
            //cuando estamos logeados
            this.botIniSes.visible = false;
            this.botOpciones.visible = true;
        }

        ///////////////////////////
        //FUNCIONALIDADES BOTONES//
        ///////////////////////////

        //funcionalidad boton START
        ///////////////////////////
        botStart.on('pointerover',()=>{
            botStart.setFrame(1);
        });
        botStart.on('pointerout',()=>{
            botStart.setFrame(0);
        });
        botStart.on('pointerdown',()=>{
            this.scene.start('EscenaPrincipal');
        });


        //funcionalidad boton CONTROLES
        ///////////////////////////////
        botControles.on('pointerover',()=>{
            botControles.setFrame(1);
        });
        botControles.on('pointerout',()=>{
            botControles.setFrame(0);
        });
        botControles.on('pointerdown',()=>{
            this.scene.start('MenuControles');
        });


        //funcionalidad boton RESULTADOS
        ////////////////////////////////
        botResultados.on('pointerover',()=>{
            botResultados.setFrame(1);
        });
        botResultados.on('pointerout',()=>{
            botResultados.setFrame(0);
        });
        botResultados.on('pointerdown',()=>{
            this.scene.start('MenuResultados');
        });


        //funcionalidad boton CREDITOS
        //////////////////////////////
        botCreditos.on('pointerover',()=>{
            botCreditos.setFrame(1);
        });
        botCreditos.on('pointerout',()=>{
            botCreditos.setFrame(0);
        });
        botCreditos.on('pointerdown',()=>{
            this.scene.start('MenuCreditos');
        });


        ////////////////////////////////////
        //FUNCIONALIDADES BOTONES API REST//
        ////////////////////////////////////

        //funcionalidad boton INICIAR SESION
        ////////////////////////////////////
        this.botIniSes.on('pointerover',()=>{
            this.botIniSes.setFrame(1);
        });
        this.botIniSes.on('pointerout',()=>{
            this.botIniSes.setFrame(0);
        });

        this.botIniSes.on('pointerdown',()=>{
            this.scene.pause();
            this.scene.launch('IniciarSesion');
        });


        //funcionalidad boton OPCIONES
        //////////////////////////////
        this.botOpciones.on('pointerover',()=>{
            this.botOpciones.setFrame(1);
        });
        this.botOpciones.on('pointerout',()=>{
            this.botOpciones.setFrame(0);
        });
        this.botOpciones.on('pointerdown',()=>{
            this.scene.pause();
            this.scene.launch('OpcionesAPI');
        });

    }

}