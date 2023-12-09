class GanarPerder extends Phaser.Scene {
    constructor() {
        super({key: 'GanarPerder', active: false});
        this.hasGanado = null;
        this.hasPerdido = null;
        this.camaraSecundaria;
    }

    preload() {
        this.load.image('HasGanado', 'Assets/Sprites/carteles_victoria_derrota/you_win.png');
        this.load.image('HasPerdido', 'Assets/Sprites/carteles_victoria_derrota/you_lose.png');
    }

    create() {
        this.hasGanado = this.physics.add.sprite(8000, 300, 'HasGanado');
        this.hasPerdido = this.physics.add.sprite(-8000, 300, 'HasPerdido');

        this.cameras.main.setSize(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.cameras.main.startFollow(this.hasGanado, true);
        this.cameras.main.setZoom(0.2);
        this.camaraSecundaria = this.cameras.add(this.sys.game.scale.gameSize.width/2, 0, this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height);
        this.camaraSecundaria.startFollow(this.hasPerdido, true);
        this.camaraSecundaria.setZoom(0.2);

    }


}
