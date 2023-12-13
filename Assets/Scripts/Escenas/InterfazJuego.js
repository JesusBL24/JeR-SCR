class InterfazJuego extends Phaser.Scene{
    constructor(props) {
        super({key:'InterfazJuego', active: false});
        this.vidaNave1;
    }

    preload(){
        //cargamos los sprites
        this.load.image('cajaBoosters','Assets/Sprites/Interfaces/ingame/BoosterBaseIconJER.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.load.image('lineaDiv','Assets/Sprites/Menus/LineaDivisoriaJugadores.png');
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////////////////////////////////////////////////////
        //CAJAS FIJAS QUE CONTIENE LOS BOOSTERS DE CADA JUGADOR//
        /////////////////////////////////////////////////////////
        
        //caja lienzo
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);
        this.add.image(0,0,'lineaDiv').setOrigin(0,0);
        // Jugador 1 (izquierda/wasd)
        const booster1 = this.add.image(50, 650, 'cajaBoosters').setScale(0.05, 0.05);
        const booster2 = this.add.image(110, 650, 'cajaBoosters').setScale(0.05, 0.05);
        const booster3 = this.add.image(170, 650, 'cajaBoosters').setScale(0.05, 0.05);

        //Barras de vida
        this.vidaNave1 = new BarraVida(this, 13, 13, 0);
        this.vidaNave1.Init(this.scene.get("EscenaPrincipal").nave1);

        this.vidaNave2 = new BarraVida(this, 888, 13, 1);;
        this.vidaNave2.Init(this.scene.get("EscenaPrincipal").nave2);

        // Add text 'A' inside each booster for Player 1
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
        };

        // Jugador 2 (derecha/arrow keys)
        const booster4 = this.add.image(650, 650, 'cajaBoosters').setScale(0.05, 0.05);
        const booster5 = this.add.image(710, 650, 'cajaBoosters').setScale(0.05, 0.05);
        const booster6 = this.add.image(770, 650, 'cajaBoosters').setScale(0.05, 0.05);

        // Con ello conseguimos comunicacion entre escenas
        this.scene.get('EscenaPrincipal').events.on('booster_obtenido', (data) => {
            switch(data.tipo){
                case BoosterType.Speed:
                    if(!data.esJugador1){
                        this.add.text(booster1.x - 10, booster1.y - 10, 'V', textStyle).setColor('#00FF00');
                    } else{
                        this.add.text(booster4.x - 10, booster4.y - 10, 'V', textStyle).setColor('#00FF00');
                    }
                break;
                case BoosterType.Damage:
                    if(!data.esJugador1){
                        this.add.text(booster2.x - 10, booster2.y - 10, 'D', textStyle).setColor('#FF0000');
                    } else{
                        this.add.text(booster5.x - 10, booster5.y - 10, 'D', textStyle).setColor('#FF0000');
                    }
                break;
                case BoosterType.Shield:
                    if(!data.esJugador1){
                        this.add.text(booster3.x - 10, booster3.y - 10, 'S', textStyle).setColor('#0000FF');
                    } else{
                        this.add.text(booster6.x - 10, booster6.y - 10, 'S', textStyle).setColor('#0000FF');
                    }
                break;
            }

        });

        /////////////////////////
        //VIDA DE LOS JUGADORES//
        /////////////////////////
    }

    update(){
        this.vidaNave1.Update();
        this.vidaNave2.Update();
    }

}