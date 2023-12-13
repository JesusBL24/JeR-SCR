class Mapa {
  constructor() {
    //NÚMERO DE METEORITOS A CREAR EN EL MAPA
    this.numeroDeMeteoritos = 50;

    //METEORITOS EN EL MAPA
    this.meteoritos = null;

    //CUERPO DE LOS METEORITOS EN EL MAPA
    this.cuerposMeteoritos = [];

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

    //GENERAMOS EL LIMITE DE LA ESCENA
    this.GenerarLimite(escena);

    //GENERAMOS LOS METEORITOS
    this.meteoritos = new Array(this.numeroDeMeteoritos);

    //GENERAMOS CADA METEORITO
    for(var i = 0; i < this.numeroDeMeteoritos; i++){
      this.meteoritos[i] = new Meteorito();
      this.meteoritos[i].SpawnMeteorito(escena);

      //AÑADIMOS EL CUERPO DE LOS METEORITOS AL ARRAY AUXILIAR
      this.cuerposMeteoritos[i] = this.meteoritos[i].cuerpo;
    }

    //COLOCAMOS LOS METEORITOS EN EL MAPA
    var limiteMeteoritos = new Phaser.Geom.Circle(0, 0, this.diametro * 0.8);
    Phaser.Actions.RandomCircle(this.cuerposMeteoritos, limiteMeteoritos);
  }

  //FUNCIÓN DE ACTUALIZACIÓN DEL MAPA
  Update(escena, jugador1, jugador2) {
    //PINTA EL LIMITE
    this.graficos.clear();
    this.graficos.strokeCircleShape(this.limite);

    //COMPRUEBA LAS COLISIONES CON EL LIMITE DEL MAPA
    escena.physics.world.collide(jugador1.cuerpo, this.CollidersLimite);
    escena.physics.world.collide(jugador2.cuerpo, this.CollidersLimite);
    escena.physics.world.collide(this.cuerposMeteoritos, this.CollidersLimite);
  }

}
