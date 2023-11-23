/////OTRAS VARIABLES/////
var nave1 = new Nave();

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
            debug: false
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
    this.load.spritesheet('dude', 'Assets/Sprites/Ejemplo/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    nave1.GenerarNave(this);
}

function update ()
{
    nave1.Update(this);
}
/////FIN FUNCIONES DE LA ESCENA/////