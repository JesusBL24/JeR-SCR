class MenuControles extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuControles'});
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoControles','Assets/Sprites/Menus/MenuControles.png')
    }

    create(){

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoControles').setScale(0.4,0.445).setOrigin(0,0);
    }

}