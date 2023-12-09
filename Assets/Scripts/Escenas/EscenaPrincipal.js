class EscenaPrincipal extends Phaser.Scene {
    constructor() {
        super({key: 'EscenaPrincipal'});
        this.nave1 = new Nave();
        this.mapa = new Mapa();
    }

    preload() {
        this.load.image('bomb', 'Assets/Sprites/Ejemplo/bomb.png');
        this.load.image('pandora', 'Assets/Sprites/Naves/Pandora.png');
        //this.load.spritesheet('ravager', 'Assets/Sprites/Naves/Ravager.png');
    }

    create() {
        this.mapa.GenerarMapa(this);
        this.nave1.GenerarNave(this);
    }

    update() {
        //nave1.Update(this);
        this.mapa.Update(this, this.nave1);
        this.nave1.Update(this);
    }

}
