//////////////////////////////////
/////CONFIGURACUION DEL JUEGO/////
//////////////////////////////////
var config = {
  type: Phaser.AUTO,
  parent: "Juego",
  width: 1200,
  height: 700,
  //dom sobre el canvas para añadir html como objetos para el input text
  dom:{
    createContainer: true
  },
  //escenas de nuestro juego
  scene: [
    MenuInicial,
    MenuControles,
    MenuBoosters,
    MenuCreditos,
    EscenaPrincipal,
    InterfazJuego,
    GanarPerder,
    MenuResultados,
    MenuResultados2,
    IniciarSesion,
    OpcionesAPI,
    MenuMatchmaking,
    EscenaPrincipalOnline
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
