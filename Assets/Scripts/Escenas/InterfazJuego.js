class InterfazJuego extends Phaser.Scene{
    constructor(props) {
        super({key:'InterfazJuego', active: false});
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

        //Jugador 1 (izquierda/wasd)
        this.add.image(50,650,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(110,650,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(170,650,'cajaBoosters').setScale(0.05,0.05);

        //Jugador 2 (derecha/numpad)
        this.add.image(650,650,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(710,650,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(770,650,'cajaBoosters').setScale(0.05,0.05);


        /////////////////////////
        //VIDA DE LOS JUGADORES//
        /////////////////////////
    }

}