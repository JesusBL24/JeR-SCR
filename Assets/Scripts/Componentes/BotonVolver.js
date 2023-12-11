class BotonVolver{
    constructor(scene) {
        this.relatedScene = scene;
    }

    preload(){
        //cargamos imagen
        this.relatedScene.load.spritesheet('botonVolver', 'Assets/Sprites/Menus/VolverSpriteSheet.png',{frameWidth: 946,frameHeight: 385});
    }

    create(){

        /////////
        //BOTON//
        /////////

        this.botonVolver = this.relatedScene.add.sprite(1100, 650, 'botonVolver').setScale(0.1,0.1).setInteractive();

        ///////////////////////
        //FUNCIONALIDAD BOTON//
        ///////////////////////

        this.botonVolver.on('pointerover',()=>{
            this.botonVolver.setFrame(1);
        });
        this.botonVolver.on('pointerout',()=>{
            this.botonVolver.setFrame(0);
        });

        this.botonVolver.on('pointerdown',()=>{
            this.relatedScene.scene.start('MenuInicial');
        });
    }
}