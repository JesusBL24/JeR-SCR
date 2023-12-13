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
    MenuBoosters,
    MenuCreditos,
    EscenaPrincipal,
    InterfazJuego,
    GanarPerder,
  ],
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};

///////////////
/////JUEGO/////
///////////////
var game = new Phaser.Game(config);
