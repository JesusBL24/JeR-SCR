class EscenaPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: "EscenaPrincipal" });
    this.nave1 = null;
    this.nave2 = null;
    this.mapa = null;
    this.camaraSecundaria = null;
    this.finDePartida = null;
  }

  preload() {
    this.load.image("bomb", "Assets/Sprites/Ejemplo/bomb.png");
    this.load.image("pandora", "Assets/Sprites/Naves/Pandora.png");
    this.load.spritesheet("booster", "Assets/Sprites/Boosters/ShieldSCR.png", {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 5,
    });
    //this.load.spritesheet('ravager', 'Assets/Sprites/Naves/Ravager.png');
  }

  create() {
    //LLAMAMOS A LA INTERFAZ DE JUEGO PARA PINTARLA POR ENCIMA
    this.scene.launch("InterfazJuego");

    //MAPA
    this.mapa = new Mapa();
    this.mapa.GenerarMapa(this);
    //JUGADOR 1
    this.nave1 = new Nave();
    this.nave1.GenerarNave(this);
    //JUGADOR 2
    this.nave2 = new Nave();
    this.nave2.jugador1 = false;
    this.nave2.GenerarNave(this);

    // BOOSTER EJEMPLo
    this.booster = new Booster(BoosterType.Speed, { x: 500, y: 100 });
    this.booster.GenerarBooster(this);
    this.booster.addColliders(this.nave1, (_, __) =>
      this.nave1.cogerBooster(this.booster)
    );
    this.booster.addColliders(this.nave2, (_, __) =>
      this.nave2.cogerBooster(this.booster)
    );

    //COLISIÓN ENTRE JUGADOR 1 Y 2
    this.physics.add.collider(
      this.nave1.cuerpo,
      this.nave2.cuerpo,
      null,
      null,
      this
    );

    //PANTALLA DIVIDIDA
    //AJUSTAMOS LA CAMARA PRINCIPAL Y LA SECUNDARIA A LA PANTALLA DE JUEGO
    //Y HACEMOS QUE CADA UNA DE ELLAS SIGA A UN JUGADOR
    this.cameras.main.setSize(
      this.sys.game.scale.gameSize.width / 2,
      this.sys.game.scale.gameSize.height
    );
    this.cameras.main.startFollow(this.nave1.cuerpo, true);
    this.cameras.main.setZoom(1);
    this.camaraSecundaria = this.cameras.add(
      this.sys.game.scale.gameSize.width / 2,
      0,
      this.sys.game.scale.gameSize.width / 2,
      this.sys.game.scale.gameSize.height
    );
    this.camaraSecundaria.startFollow(this.nave2.cuerpo, true);
    this.camaraSecundaria.setZoom(1);

    //FADE IN
    this.cameras.main.fadeIn(2000);
    this.camaraSecundaria.fadeIn(2000);

    //INDICADOR DEL FINAL DE LA PARTIDA
    this.finDePartida = false;

    //INICIA LA ESCENA GANARPERDER
    this.scene.run("GanarPerder");
    //INICIA LA ESCENA DE LA INTERFAZ DEL JUEGO
    this.scene.run("InterfazJuego");
  }

  update() {
    if (!this.finDePartida) {
      this.mapa.Update(this, this.nave1, this.nave2);
      this.nave1.Update(this);
      this.nave2.Update(this);

      //SI UNO DE LOS JUGADORES MUERE, LANZAMOS EL EVENTO "finDePArtida"
      if (this.nave1.vida <= 0 || this.nave2.vida <= 0) {
        this.events.emit("finDePartida");
        this.finDePartida = true;
        //HACEMOS UN FADE OUT DE AMBAS CAMARAS
        this.cameras.main.fadeOut(3000);
        this.camaraSecundaria.fadeOut(3000);
        //HACEMOS UN FADE OUT DE LA INTERFAZ DEL JUEGO
        this.scene.get("InterfazJuego").cameras.main.fadeOut(3000);
      }
    }
  }
}
