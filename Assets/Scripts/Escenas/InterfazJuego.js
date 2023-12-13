class InterfazJuego extends Phaser.Scene{
    constructor(props) {
        super({key:'InterfazJuego', active: false});
        this.vidaNave1;
        this.vidaNave2;
        this.municion1;
        this.municion2;
    }

    preload(){
        //cargamos los sprites
        this.load.image('cajaBoosters','Assets/Sprites/Interfaces/ingame/BoosterBaseIconJER.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.load.image('lineaDiv','Assets/Sprites/Menus/LineaDivisoriaJugadores.png');
        this.load.spritesheet("boosters", "Assets/Sprites/Interfaces/ingame/BoosterIcons.png", {
            frameWidth: 1024,
            frameHeight: 1024,
            startFrame: 0,
            endFrame: 8,
        });
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

        // Jugador 2 (derecha/arrow keys)
        const booster4 = this.add.image(650, 650, 'cajaBoosters').setScale(0.05, 0.05);
        const booster5 = this.add.image(710, 650, 'cajaBoosters').setScale(0.05, 0.05);
        const booster6 = this.add.image(770, 650, 'cajaBoosters').setScale(0.05, 0.05);

        //IMÁGENES PARA MOSTRAR LOS BOOSTERS ACTIVOS
        var j1b1 = this.add.sprite(0,0, "boosters").setVisible(false);
        var j1b2 = this.add.sprite(0,0, "boosters").setVisible(false);
        var j1b3 = this.add.sprite(0,0, "boosters").setVisible(false);

        var j2b1 = this.add.sprite(0,0, "boosters").setVisible(false);
        var j2b2 = this.add.sprite(0,0, "boosters").setVisible(false);
        var j2b3 = this.add.sprite(0,0, "boosters").setVisible(false);

        //COMUNICACIÓN CON LA ESCENA PRINCIPAL PARA CUANDO CONSIGUES BOOSTERS
        this.scene.get('EscenaPrincipal').events.on('booster_obtenido', (data) => {
            var scale = 1/25;
            switch(data.tipo){
                //SI ES DE VELOCIDAD
                case BoosterType.Speed:
                    if(data.esjugador1){
                        console.log("entra aqui")
                        j1b1.destroy();
                        j1b1 = this.add.sprite(booster1.x, booster1.y, "boosters", 2).setScale(scale);
                    } else{
                        j2b1.destroy();
                        j2b1 = this.add.sprite(booster4.x, booster4.y, "boosters", 2).setScale(scale);
                    }
                break;

                //SI ES DE DAÑO
                case BoosterType.Damage:
                    if(data.esjugador1){
                        j1b2.destroy();
                        switch(data.arma){
                            case 1:
                                j1b2 = this.add.sprite(booster2.x, booster2.y, "boosters", 0).setScale(scale);
                                break;
                            case 2:
                                j1b2 = this.add.sprite(booster2.x, booster2.y, "boosters", 1).setScale(scale);
                                break;
                            case 3:
                                j1b2 = this.add.sprite(booster2.x, booster2.y, "boosters", 7).setScale(scale);
                                break;
                        }
                    } else{
                        j2b2.destroy();
                        switch(data.arma){
                            case 1:
                                j2b2 = this.add.sprite(booster5.x, booster5.y, "boosters", 0).setScale(scale);
                                break;
                            case 2:
                                j2b2 = this.add.sprite(booster5.x, booster5.y, "boosters", 1).setScale(scale);
                                break;
                            case 3:
                                j2b2 = this.add.sprite(booster5.x, booster5.y, "boosters", 7).setScale(scale);
                                break;
                        }
                    }
                break;

                //SI ES DE ESCUDO
                case BoosterType.Shield:
                    if(data.esjugador1){
                        j1b3.destroy();
                        j1b3 = this.add.sprite(booster3.x, booster3.y, "boosters", 4).setScale(scale);
                    } else{
                        j2b3.destroy();
                        j2b3 = this.add.sprite(booster6.x, booster6.y, "boosters", 4).setScale(scale);
                    }
                break;
            }

        });

        //COMUNICACIÓN CON LA ESCENA 
        this.scene.get('EscenaPrincipal').events.on('booster_perdido', (data) => {
            switch(data.tipo){
                //SI ES DE DAÑO
                case BoosterType.Damage:
                    if(data.esjugador1){
                        j1b2.destroy();
                    } else{
                        j2b2.destroy();
                    }
                break;

                //SI ES DE ESCUDO
                case BoosterType.Shield:
                    if(data.esjugador1){
                        j1b3.destroy();
                    } else{
                        j2b3.destroy();
                    }
                break;
            }
        });

        /////////////////////////
        //VIDA DE LOS JUGADORES//
        /////////////////////////
        this.vidaNave1 = new BarraVida(this, 13, 13, 0);
        this.vidaNave1.Init(this.scene.get("EscenaPrincipal").nave1);

        this.vidaNave2 = new BarraVida(this, 888, 13, 1);;
        this.vidaNave2.Init(this.scene.get("EscenaPrincipal").nave2);

        //////////////
        //MUNICIONES//
        //////////////
        // FUENTE DE TEXTO 
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '35px',
            color: '#ffffff',
        };

        //ELEMENTOS DE TEXTO
        this.municion1 = this.add.text(25, 575, "-", textStyle);
        this.municion2 = this.add.text(625, 575, "-", textStyle);

    }

    update(){
        //ACTUALIZACIÓN DE BARRAS DE VIDA
        this.vidaNave1.Update();
        this.vidaNave2.Update();

        //ACTUALIZACIÓN DE MUNICIONES
        this.municion1.text = this.vidaNave1.GetPlayerAmmo();
        this.municion2.text = this.vidaNave2.GetPlayerAmmo();
    }
}