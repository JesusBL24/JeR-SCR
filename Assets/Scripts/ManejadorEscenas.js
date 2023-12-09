//////////////////////////////////
/////CONFIGURACUION DEL JUEGO/////
//////////////////////////////////
var config = {
        type: Phaser.AUTO,
        parent: 'Juego',
        width: 800,
        height: 600,
        scene: [EscenaPrincipal, GanarPerder],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        },
    };


///////////////
/////JUEGO/////
///////////////
    var game = new Phaser.Game(config);
