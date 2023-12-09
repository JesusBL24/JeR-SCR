class MenuControles extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuControles'});
        this.botonVolver = new BotonVolver(this);
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoControles','Assets/Sprites/Menus/MenuControles.png')
        this.botonVolver.preload();
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoControles').setScale(0.4,0.445).setOrigin(0,0);

        /////////
        //BOTON//
        /////////

        this.botonVolver.create();
    }

}