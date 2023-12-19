class MenuHistorial extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuHistorial'});
        this.botonVolver = new BotonVolver(this);
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoHistorial','Assets/Sprites/Menus/MenuHistorial.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.botonVolver.preload();
    }

    create(){
        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoHistorial').setScale(0.6, 0.58).setOrigin(0,0);
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);

        /////////
        //BOTON//
        /////////

        this.botonVolver.create();
    }
}