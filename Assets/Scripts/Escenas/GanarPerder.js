class GanarPerder extends Phaser.Scene {
    constructor() {
        super({key: 'GanarPerder', active: true});
        this.hasGanado = null;
        this.hasPerdido = null;
        this.camaraSecundaria;
    }

    preload() {
        //CARGAMOS LAS IMAGENES DE "HAS PERDIDO" Y "HAS GANADO"
        this.load.image('HasGanado', 'Assets/Sprites/carteles_victoria_derrota/you_win.png');
        this.load.image('HasPerdido', 'Assets/Sprites/carteles_victoria_derrota/you_lose.png');
    }

    create() {
        //GENERAMOS LOS SPRITES DE "HAS PERDIDO" Y "HAS GANADO"
        //LOS CREAMOS FUERA DE LO QUE SERA EL AREA DE JUEGO PARA QUE NO MOLESTEN
        this.hasGanado = this.physics.add.sprite(8000, 300, 'HasGanado');
        this.hasPerdido = this.physics.add.sprite(-8000, 300, 'HasPerdido');

        //AJUSTAMOS LA CAMARA PRINCIPAL Y LA SECUNDARIA A LA PANTALLA DE JUEGO
        this.cameras.main.setSize(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.cameras.main.setZoom(0.2);
        this.camaraSecundaria = this.cameras.add(this.sys.game.scale.gameSize.width/2, 0, this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.camaraSecundaria.setZoom(0.2);

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
        }, this);

    }


}
