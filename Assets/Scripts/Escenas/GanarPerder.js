class GanarPerder extends Phaser.Scene {
    constructor() {
        super({key: 'GanarPerder', active: false});
        this.hasGanado = null;
        this.hasPerdido = null;
        this.camaraSecundaria = null;
    }

    preload() {
        //CARGAMOS LAS IMAGENES DE "HAS PERDIDO" Y "HAS GANADO"
        this.load.image('HasGanado', 'Assets/Sprites/carteles_victoria_derrota/has_ganado.png');
        this.load.image('HasPerdido', 'Assets/Sprites/carteles_victoria_derrota/has_perdido.png');
    }

    create() {
        //GENERAMOS LOS SPRITES DE "HAS PERDIDO" Y "HAS GANADO"
        //LOS CREAMOS FUERA DE LO QUE SERA EL AREA DE JUEGO PARA QUE NO MOLESTEN
        this.hasGanado = this.physics.add.sprite(8000, 300, 'HasGanado');
        this.hasPerdido = this.physics.add.sprite(-8000, 300, 'HasPerdido');

        //AJUSTAMOS LA CAMARA PRINCIPAL Y LA SECUNDARIA A LA PANTALLA DE JUEGO
        this.cameras.main.setSize(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.cameras.main.setZoom(0.5);
        this.camaraSecundaria = this.cameras.add(this.sys.game.scale.gameSize.width/2, 0, this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.camaraSecundaria.setZoom(0.5);

        //SI DESDE LA ESCENA PRINCIPAL SE LANZA EL EVENTO "finDePArtida", MOSTRAMOS A CADA LADO DE LA PANTALLA LA IMAGEN CORRESPONDIENTE
        this.scene.get('EscenaPrincipal').events.on('finDePartida', function ()
        {
            //SI PIERDE EL JUGADOR 1
            if(this.scene.get('EscenaPrincipal').nave1.vida <= 0){
                this.cameras.main.startFollow(this.hasPerdido, true);
                this.camaraSecundaria.startFollow(this.hasGanado, true);
            }
            //SI GANA EL JUGADOR 1
            else{
                this.cameras.main.startFollow(this.hasGanado, true);
                this.camaraSecundaria.startFollow(this.hasPerdido, true);
            }

            //DESPUES DE TRES SEGUNDOS SE HACE UN FADE OUT DE AMBAS CAMARAS
            this.time.delayedCall(3000, function (){
                this.cameras.main.fadeOut(2000);
                this.camaraSecundaria.fadeOut(2000);
                //TRAS EL FADE OUT SE CAMBIA DE ESCENA
                this.time.delayedCall(2000, function (){
                    this.scene.stop('EscenaPrincipal');
                    this.scene.stop('InterfazJuego');
                    this.scene.start('MenuInicial');
                }, [], this);


            }, [], this);
        }, this);

    }


}
