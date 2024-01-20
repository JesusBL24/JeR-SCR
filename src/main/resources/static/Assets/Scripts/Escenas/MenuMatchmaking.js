class MenuMatchmaking extends Phaser.Scene {
    constructor(props) {
        super({key: 'MenuMatchmaking'});
    }

    preload(){
        //se cargan las imagenes
        this.load.image('fondoMO','Assets/Sprites/Menus/MenuCargandoOnline.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.load.spritesheet('botonVolver', 'Assets/Sprites/Menus/VolverSpriteSheet.png',{frameWidth: 946,frameHeight: 345});
        this.load.spritesheet('avionesCarga', 'Assets/Sprites/Menus/AvionesSpritesheet.png',{frameWidth: 1218,frameHeight: 151});
    }

    create(){
        //PONE POSICION A NULL
        posicion = null;

        //LLAMA A LA FUNCION PARA CREAR UN WS
        abrirConexionWS();

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoMO').setScale(0.6, 0.58).setOrigin(0,0);
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);

        //////////////////
        //AVION DE CARGA//
        //////////////////

        this.anims.create({
            key: 'loopAviones',
            frames: this.anims.generateFrameNumbers('avionesCarga', { frames: [ 0, 1, 2 ] }),
            frameRate: 2,
            repeat: -1
        });
        var aviones = this.add.sprite(600,425,'avionesCarga').setScale(0.6,0.6);
        aviones.play("loopAviones");

        ///////////
        //BOTONES//
        ///////////

        var botVolver = this.add.sprite(1100, 650, 'botonVolver').setScale(0.125,0.125).setInteractive();

        ///////////////////////////
        //FUNCIONALIDADES BOTONES//
        ///////////////////////////

        //funcionalidad boton VOLVER
        ////////////////////////////
        botVolver.on('pointerover',()=>{
            botVolver.setFrame(1);
        });
        botVolver.on('pointerout',()=>{
            botVolver.setFrame(0);
        });
        botVolver.on('pointerdown',()=>{
            cerrarConexionWS();
            this.scene.start('MenuInicial');
        });
    }

    update()
    {
        if(posicion != null)
        {
            this.scene.start('EscenaPrincipalOnline');
        }
    }
}