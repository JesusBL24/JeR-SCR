class InterfazJuego extends Phaser.Scene{
    constructor(props) {
        super({key:'InterfazJuego', active: false});
    }

    preload(){
        //cargamos los sprites
        this.load.image('cajaBoosters','Assets/Sprites/Interfaces/ingame/BoosterBaseIconJER.png');
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////////////////////////////////////////////////////
        //CAJAS FIJAS QUE CONTIENE LOS BOOSTERS DE CADA JUGADOR//
        /////////////////////////////////////////////////////////

        //Jugador 1 (izquierda/wasd)
        this.add.image(50,550,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(110,550,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(170,550,'cajaBoosters').setScale(0.05,0.05);

        //Jugador 2 (derecha/numpad)
        this.add.image(650,550,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(710,550,'cajaBoosters').setScale(0.05,0.05);
        this.add.image(770,550,'cajaBoosters').setScale(0.05,0.05);


        /////////////////////////
        //VIDA DE LOS JUGADORES//
        /////////////////////////
    }

}