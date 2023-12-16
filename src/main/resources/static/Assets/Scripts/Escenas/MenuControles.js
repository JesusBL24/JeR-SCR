class MenuControles extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuControles'});
        this.botonVolver = new BotonVolver(this);
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoControles','Assets/Sprites/Menus/MenuControles.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.load.spritesheet('botonBoosters','Assets/Sprites/Menus/BoostersSpriteSheet.png',{frameWidth: 946,frameHeight: 385})
        this.botonVolver.preload();
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoControles').setScale(0.6, 0.58).setOrigin(0,0);
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);

        ///////////
        //BOTONES//
        ///////////

        this.botonVolver.create();
        var botBooster = this.add.sprite(1000, 650,'botonBoosters').setScale(0.1,0.1).setInteractive();

        /////////////////////////
        //FUNCIONALIDAD BOTONES//
        /////////////////////////

        botBooster.on('pointerover',()=>{
            botBooster.setFrame(1);
        });
        botBooster.on('pointerout',()=>{
            botBooster.setFrame(0);
        });
        botBooster.on('pointerdown',()=>{
            this.scene.start('MenuBoosters');
        });
    }

}