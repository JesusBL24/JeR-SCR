class Mapa {
  constructor() {
    //NÚMERO DE METEORITOS A CREAR EN EL MAPA
    this.numeroDeMeteoritos = 100;

    //METEORITOS EN EL MAPA
    this.meteoritos = null;

    //TAMAÑO DEL MAPA
    this.diametro = 1000;

    //LIMITE DEL MAPA
    this.limite = null;

    //OBJETOS EN EL LIMITE DEL MAPA PARA QUE EL JUGADOR NO PUEDA SALIR
    this.CollidersLimite = null;

    //ESTILO DE GRÁFICOS (DE MOMENTO PARA PINTAR EL LIMITE)
    this.graficos = null;
  }

  //FUNCION QUE GENERA EL LIMITE DEL MAPA
  GenerarLimite(escena) {
    //GENERA EL CISCULO QUE HACE DE LIMITE DEL MAPA
    this.limite = new Phaser.Geom.Circle(0, 0, this.diametro);

    //DEFINE COMO SE PINTARA EL CIRCULO QUE LIMITA EL MAPA
    this.graficos = escena.add.graphics({
      lineStyle: { width: 2, color: 0xff0000 },
      fillStyle: { color: 0x00ff00 },
    });

    //GENERA LOS OBJETOS QUE IMPEDIRAN AL JUGADOR SALIR DEL MAPA (DE MOMENTO SE USA UN SPRITE DE BOMBA)
    //(EL NUMERO DE ELEMENTOS Y SU TAMAÑO TENDRA QUE IR EN FUNCIÓN DEL TAMAÑO DEL CIRCULO)
    this.CollidersLimite = escena.physics.add.staticGroup({
      key: "bomb",
      frameQuantity: 180,
    });

    //ASIGNA UN COLLIDER CIRCULAR A CADA OBJETO DENTRO DE COLLIDERS LIMITE
    for (const collider of this.CollidersLimite.getChildren()) {
      collider.setCircle(8);
    }

    //COLOCA LOS COLLIDERS EN EL LIMITE
    Phaser.Actions.PlaceOnCircle(
      this.CollidersLimite.getChildren(),
      this.limite
    );

    //REFRESCA COLLIDERS LIMITE DESPUÉS DE ALTERAR SU POSICIÓN
    this.CollidersLimite.refresh();
  }

  //FUNCIÓN PARA GENERAR EL MAPA (TODO)
  GenerarMapa(escena) {
    this.GenerarLimite(escena);
    this.meteoritos = new Array(this.numeroDeMeteoritos);
    for(var i = 0; i < this.numeroDeMeteoritos; i++){
      this.meteoritos[i] = new Meteorito();
      this.meteoritos[i].SpawnMeteorito(escena);
      this.meteoritos[i] = this.meteoritos[i].cuerpo;
    }
    Phaser.Actions.RandomCircle(this.meteoritos, this.limite);
  }

  //FUNCIÓN DE ACTUALIZACIÓN DEL MAPA
  Update(escena, jugador1, jugador2) {
    //PINTA EL LIMITE
    this.graficos.clear();
    this.graficos.strokeCircleShape(this.limite);

    //COMPRUEBA LAS COLISIONES CON EL LIMITE DEL MAPA (AQUI HHABRA QUE AÑADIR LOS METEORITOS)
    escena.physics.world.collide(jugador1.cuerpo, this.CollidersLimite);
    escena.physics.world.collide(jugador2.cuerpo, this.CollidersLimite);
  }

}
