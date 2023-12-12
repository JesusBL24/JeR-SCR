class MenuCreditos extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuCreditos'});
        this.botonVolver = new BotonVolver(this);
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoCreditos','Assets/Sprites/Menus/MenuCreditos.png')
        this.botonVolver.preload();
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoCreditos').setScale(0.6, 0.55).setOrigin(0,0);

        /////////
        //BOTON//
        /////////

        this.botonVolver.create();
    }

}