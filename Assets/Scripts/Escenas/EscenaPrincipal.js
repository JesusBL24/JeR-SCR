class EscenaPrincipal extends Phaser.Scene {
    constructor() {
        super({key: 'EscenaPrincipal'});
        this.nave1 = new Nave();
        this.nave2 = new Nave();
        this.mapa = new Mapa();
        this.camaraSecundaria;
    }

    preload() {
        this.load.image('bomb', 'Assets/Sprites/Ejemplo/bomb.png');
        this.load.image('pandora', 'Assets/Sprites/Naves/Pandora.png');
        //this.load.spritesheet('ravager', 'Assets/Sprites/Naves/Ravager.png');
    }

    create() {
        //MAPA
        this.mapa.GenerarMapa(this);
        //JUGADOR 1
        this.nave1.GenerarNave(this);
        //JUGADOR 2
        this.nave2.jugador1 = false;
        this.nave2.GenerarNave(this);

        //COLISIÓN ENTRE JUGADOR 1 Y 2
        this.physics.add.collider(this.nave1.cuerpo, this.nave2.cuerpo, null, null, this);

        //PANTALLA DIVIDIDA
        this.cameras.main.setSize(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.cameras.main.startFollow(this.nave1.cuerpo, true);
        this.cameras.main.setZoom(2);
        this.camaraSecundaria = this.cameras.add(this.sys.game.scale.gameSize.width/2, 0, this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.camaraSecundaria.startFollow(this.nave2.cuerpo, true);
        this.camaraSecundaria.setZoom(2);

    }

    update() {
        this.mapa.Update(this, this.nave1, this.nave2);
        this.nave1.Update(this);
        this.nave2.Update(this);
    }

}
