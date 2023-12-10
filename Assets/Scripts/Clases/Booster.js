const BoosterType = {
  Speed: "Speed",
  Damage: "Damage",
  Shield: "Shield",
};

class Booster {
  constructor(tipo, { x, y }) {
    //SPRITE DEL BOOSTER (GAMEOBJECT)
    this.cuerpo;

    //TIPO DE BOOSTER
    this.tipo = tipo;

    // POSICION
    this.posicion = { x, y };
  }

  GenerarBooster(escena) {
    this.escena = escena;
    const config = {
      key: "booster_animation",
      frames: escena.anims.generateFrameNumbers("booster", {
        start: 0,
        end: 4,
        first: 4,
      }),
      frameRate: 20,
      repeat: -1,
    };

    escena.anims.create(config);
    this.cuerpo = escena.physics.add.sprite(
      this.posicion.x,
      this.posicion.y,
      "booster"
    );
  }

  addColliders(nave, cogerBooster) {
    this.escena.physics.add.overlap(nave.cuerpo, this.cuerpo, cogerBooster);
  }

  Update() {
    this.cuerpo.play("booster_animation");
  }
}
