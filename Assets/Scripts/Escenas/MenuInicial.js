class MenuInicial extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuInicial', active: true});
    }

    preload(){
        //se cargan las imagenes
        this.load.image('fondoMI','Assets/Sprites/Menus/MenuInicial.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.load.spritesheet('botonStart','Assets/Sprites/Menus/StartSpriteSheet.png',{frameWidth: 946,frameHeight: 385});
        this.load.spritesheet('botonControles','Assets/Sprites/Menus/ControlesSpriteSheet.png',{frameWidth: 946,frameHeight: 385});
        this.load.spritesheet('botonCreditos','Assets/Sprites/Menus/CreditosSpriteSheet.png',{frameWidth: 946,frameHeight: 385});
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

        var botStart = this.add.sprite(850,350,'botonStart').setScale(0.2,0.2).setInteractive();
        var botControles = this.add.sprite(850,450,'botonControles').setScale(0.2,0.2).setInteractive();
        var botCreditos = this.add.sprite(850,550,'botonCreditos').setScale(0.2,0.2).setInteractive();


        ///////////////////////////
        //FUNCIONALIDADES BOTONES//
        ///////////////////////////

        //funcionalidad boton START
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
        botControles.on('pointerover',()=>{
            botControles.setFrame(1);
        });
        botControles.on('pointerout',()=>{
            botControles.setFrame(0);
        });
        botControles.on('pointerdown',()=>{
            this.scene.start('MenuControles');
        });

        //funcionalidad boton CREDITOS
        botCreditos.on('pointerover',()=>{
            botCreditos.setFrame(1);
        });
        botCreditos.on('pointerout',()=>{
            botCreditos.setFrame(0);
        });
        botCreditos.on('pointerdown',()=>{
            this.scene.start('MenuCreditos');
        });

    }

}