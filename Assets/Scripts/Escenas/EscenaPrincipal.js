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
    //FONDO
    this.load.image('fondoEP','Assets/Sprites/Fondos/Fondo2.jpg');

    //BOMBAS LIMITE ARENA
    this.load.image("bomb", "Assets/Sprites/Ejemplo/bomb.png");

    //NAVES
    this.load.image("pandora", "Assets/Sprites/Naves/Pandora.png");
    this.load.image("ravager", "Assets/Sprites/Naves/Ravager.png");

    //PROYECTILES
    this.load.image("proyectilBasico", "Assets/Sprites/Proyectiles/ProyectilBasico.png");
    this.load.image("proyectilAmetralladora", "Assets/Sprites/Proyectiles/Ametralladora.png");
    this.load.image("dobleyectil", "Assets/Sprites/Proyectiles/Dobleyectil.png");
    this.load.image("explosionMisil", "Assets/Sprites/Proyectiles/Explosion.png");
    //this.load.image("proyectilMisil", "Assets/Sprites/Proyectiles/Misil.png");

    //ANIMACION EXPLOSION
    this.load.spritesheet("explosionAnim", "Assets/Sprites/Proyectiles/ExplosionSheet.png", {
      frameWidth: 65,
      frameHeight: 65,
      startFrame: 0,
      endFrame: 5,
    });

    //ANIMACION ESCUDO
    this.load.spritesheet("shieldAnim", "Assets/Sprites/Boosters/ShieldSCR_2k.png", {
      frameWidth: 1024,
      frameHeight: 1024,
      startFrame: 0,
      endFrame: 4,
    });

    //SPRITESHEET METEORITOS
    this.load.spritesheet("meteorite", "Assets/Sprites/Asteroides/AsteroidsSCR.png", {
      frameWidth: 1024,
      frameHeight: 1024,
      startFrame: 0,
      endFrame: 3,
    });

    //SPRITESHEET ICONOS DE BOOSTERS
    this.load.spritesheet("boosterIcons", "Assets/Sprites/Interfaces/ingame/BoosterIcons.png", {
      frameWidth: 1024,
      frameHeight: 1024,
      startFrame: 0,
      endFrame: 9,
    });

    //RESTOS
    this.load.image("trash1", "Assets/Sprites/Restos/Restos1.png");
    this.load.image("trash2", "Assets/Sprites/Restos/Restos2.png");
    this.load.image("trash3", "Assets/Sprites/Restos/Restos3.png");
    this.load.image("trash4", "Assets/Sprites/Restos/Restos4.png");
    this.load.image("trash5", "Assets/Sprites/Restos/RestoGrande.png");
    //this.load.spritesheet('ravager', 'Assets/Sprites/Naves/Ravager.png');

    //AUDIOS DE LA NAVE
    this.load.audio('thrust', 'Assets/Audio/Effects/Thrust.mp3');
    this.load.audio('thrust2', 'Assets/Audio/Effects/Thrust.mp3');
    this.load.audio('disparo', 'Assets/Audio/Effects/Laser.mp3');
    this.load.audio('disparo2', 'Assets/Audio/Effects/Laser.mp3');
  }

  create() {
    //LLAMAMOS A LA INTERFAZ DE JUEGO PARA PINTARLA POR ENCIMA
    this.scene.launch("InterfazJuego");

    //PINTAMOS EL FONDO
    this.add.image(0,0,'fondoEP').setOrigin(0,0);
    this.add.image(-2000,0,'fondoEP').setOrigin(0,0);
    this.add.image(0,-1350,'fondoEP').setOrigin(0,0);
    this.add.image(-2000,-1350,'fondoEP').setOrigin(0,0);

    //ANIMACION DE EXPLOSION
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosionAnim', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'shield',
      frames: this.anims.generateFrameNumbers('shieldAnim', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    });

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

    // // BOOSTER EJEMPLO
    // this.booster = new Booster(BoosterType.Speed, { x: 500, y: 100 });
    // this.booster.GenerarBooster(this);
    // this.booster.addColliders(this.nave1, (_, __) =>
    //   this.nave1.CogerBooster(this.booster)
    // );
    // this.booster.addColliders(this.nave2, (_, __) =>
    //   this.nave2.CogerBooster(this.booster)
    // );

    //METEORITOS;
    this.meteorites = this.physics.add.group();

    this.mapa.cuerposMeteoritos.forEach(element => {
      this.meteorites.add(element);
    });

    this.meteorites.children.iterate((meteorito, index) => {
      meteorito.datos = this.mapa.meteoritos[index];
      //console.log(meteorito);
  });

    //COLISIONES ENTRE METEORITOS Y NAVES
    this.physics.add.collider(this.meteorites);
    this.physics.add.collider(this.meteorites, this.nave1.cuerpo);
    this.physics.add.collider(this.meteorites, this.nave2.cuerpo);

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

      this.mapa.meteoritos.forEach(element => {
        element.Update();
      });

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
