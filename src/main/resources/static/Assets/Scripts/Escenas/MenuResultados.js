class MenuResultados extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuResultados'});
        this.botonVolver = new BotonVolver(this);
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoResultados','Assets/Sprites/Menus/MenuResultados.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.botonVolver.preload();
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);


        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoResultados').setScale(0.6, 0.58).setOrigin(0,0);
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);


        /////////////////////////////////////////
        //TEXTOS CON NUESTRA FUENTE TIPOGRAFICA//
        /////////////////////////////////////////

        //clasificatoria
        this.add.text(425, 225, '1. Jugador 1  20ptos', {fontFamily: 'Minecraft', fontSize: "40px"});


        /////////
        //BOTON//
        /////////

        this.botonVolver.create();
    }
}