const BoosterType = {
  Speed: "Speed",
  Damage: "Damage",
  Shield: "Shield",
};

class Booster {
  constructor(tipo, { x, y }) {
    // Sprite del booster (gameobject)
    this.cuerpo;

    // Tipo de booster
    this.tipo = tipo;

    // Posicion
    this.posicion = { x, y };
  }
  // Funcion para que aparezca el booster en la escena
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
  // Funcion con la que, en el momento en el que una nave toque un booster, se ejecute la funcion 'CogerBooster'
  addColliders(nave, CogerBooster) {
    this.escena.physics.add.overlap(nave.cuerpo, this.cuerpo, CogerBooster);
  }

  Update() {
    this.cuerpo.play("booster_animation");
  }
}