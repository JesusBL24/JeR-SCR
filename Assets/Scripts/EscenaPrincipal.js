/////OTRAS VARIABLES/////
var nave1 = new Nave();
var mapa = new Mapa();

/////CONFIGURACIÓN DE LA ESCENA/////
var config = {
    type: Phaser.AUTO,
    parent: 'Juego',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

/////ESCENA/////
var escena = new Phaser.Game(config);

/////FUNCIONES DE LA ESCENA/////
function preload ()
{
    this.load.image('bomb', 'Assets/Sprites/Ejemplo/bomb.png');
    this.load.spritesheet('dude', 'Assets/Sprites/Ejemplo/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    mapa.GenerarMapa(this);
    nave1.GenerarNave(this);
}

function update ()
{
    nave1.Update(this);
    mapa.Update(this, nave1);
}
/////FIN FUNCIONES DE LA ESCENA/////