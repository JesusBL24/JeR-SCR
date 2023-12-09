class MenuCreditos extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuCreditos'});
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoCreditos','Assets/Sprites/Menus/MenuCreditos.png')
    }

    create(){

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoCreditos').setScale(0.4,0.445).setOrigin(0,0);
    }

}