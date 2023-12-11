//////////////////////////////////
/////CONFIGURACUION DEL JUEGO/////
//////////////////////////////////
var config = {
  type: Phaser.AUTO,
  parent: "Juego",
  width: 1200,
  height: 700,
  scene: [
    MenuInicial,
    MenuControles,
    MenuCreditos,
    EscenaPrincipal,
    InterfazJuego,
    GanarPerder,
  ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

///////////////
/////JUEGO/////
///////////////
var game = new Phaser.Game(config);
