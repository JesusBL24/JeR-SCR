class Nave {
  constructor() {
    //SPRITE DE LA NAVE (GAMEOBJECT)
    this.cuerpo = null;

    //SI EL JUGADOR ES EL JUGADOR 1 O EL 2
    this.jugador1 = true;

    //VIDA DE LA NAVE
    this.vida = 100;

    //CANTIDAD DE ESCUDO DE LA NAVE
    this.escudo = 0;

    //VELOCIDAD MÁXIMA DE LA NAVE
    this.velocidadMaxima = 2000;

    //VELOCIDAD DE ROTACIÓN DE LA NAVE
    this.velocidadDeRotacion = 100;
    this.velocidadActual = 200;

    //TIPO DE DISPARO
    this.tipoDisparo = 2;

    //CADENCIA DE DISPARO
    this.cadenciaDisparo = 1000; 
    this.ultimoDisparo = 0; 

    this.filter = null;
    this.filter2 = null;
    this.intervalId = null;
    //RADIO DEL COLLIDER
    this.radioCollider = 24;

    //TECLAS DE LAS QUE DISPONE EL JUGADOR
    this.Arriba = null;
    this.Abajo = null;
    this.Izquierda = null;
    this.Derecha = null;
    this.TeclaDisparo = null;
  }
  //FUNCIÓN DE ACTUALIZACIÓN DE LA NAVE
  Update(escena) {
    this.Movimiento(escena);
    if (this.TeclaDisparo.isDown) {
      this.Disparar(escena);
    }
  }

  //FUNCION DE FEEDBACK DE DAÑO LA NAVE
  Hit(){
    Phaser.Actions.SetTint([this.cuerpo], this.colorTint1);
    setTimeout(() =>{
        this.cuerpo.clearTint();
    }, 150);

    if(this.vida <= 20 && this.vida > 10){ this.intervalId = this.LowHeal(800, false)}
    else if(this.vida <= 10){this.intervalId = this.LowHeal(600, true)}
  }

  LowHeal(frecuencia,tipo){
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
  }
    var duracion = 150;
    const color = tipo ? this.filter : this.filter2;
    const intervalId = setInterval(() => {
        Phaser.Actions.SetTint([this.cuerpo], color);
        setTimeout(() => {
            this.cuerpo.clearTint();
        }, duracion);
    }, frecuencia);
  
      // Devuelve el identificador del intervalo para que pueda detenerse más tarde si es necesario
      return intervalId;
  }

  //FUNCIÓN DE MOVIMIENTO DE LA NAVE
  Movimiento(escena) {
    //PARA ACELERAR
    if (this.Arriba.isDown) {
      escena.physics.velocityFromRotation(
        this.cuerpo.rotation,
        this.velocidadActual,
        this.cuerpo.body.acceleration
      );
    } else {
      this.cuerpo.setAcceleration(0);
    }
    //PARA GIRAR LATERALMENTE
    if (this.Izquierda.isDown) {
      this.cuerpo.setAngularVelocity(-this.velocidadDeRotacion);
    } else if (this.Derecha.isDown) {
      this.cuerpo.setAngularVelocity(this.velocidadDeRotacion);
    } else {
      this.cuerpo.setAngularVelocity(0);
    }

    //const direccionMovimiento = this.velocityFromRotation(this.rotation, 1)
    //const anguloRotacion = Phaser.Math.RadToDeg(direccionMovimiento.angle());
    //ESTO ES DE MOMENTO PARA QUE EL JUGADOR NO SE VAYA A MORDOR
    //escena.physics.world.wrap(this.cuerpo, 32);
  }

  //FUNCIÓN DE DISPARO DE LA NAVE, POSEE CADENCIA DE DISPARO
  Disparar(escena) {
    //VARIABLE PARA CALCULO DE CADENCIA
    const tiempoActual = escena.time.now;

    //CALCULO DE SI SE PUEDE DISPARAR
    if (tiempoActual - this.ultimoDisparo > this.cadenciaDisparo) {
      this.ultimoDisparo = tiempoActual;
          switch (this.tipoDisparo) {
            case 0:
              var nuevoProyectil = new Proyectil(
              this.cuerpo.x,
              this.cuerpo.y,
              this.cuerpo.rotation,
              this.jugador1,
              );
              
              nuevoProyectil.Disparar(escena);
              
              break;

            case 1:
              var nuevoProyectil = new Ametralladora(
                this.cuerpo.x,
                this.cuerpo.y,
                this.cuerpo.rotation,
                this.jugador1,
                );
                
                nuevoProyectil.Disparar(escena);
              break;

            case 2:
              var nuevoProyectil = new Dobleyectil(
                this.cuerpo.x,
                this.cuerpo.y,
                this.cuerpo.rotation,
                this.jugador1,
                );
                
                nuevoProyectil.Disparar(escena);
              break;
            case 3:
              console.log("1");
              break;
          }
          //SE IGUALA LA CADENCIA A LA DEL TIPO DE PROYECTIL
          this.cadenciaDisparo = nuevoProyectil.cadenciaDisparo;
      } 
  }

  //FUNCIÓN PARA ASIGNAR LOS CONTROLES DE LA NAVE
  AsignarTeclas(escena) {
    if (this.jugador1) {
      this.Arriba = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.W
      );
      this.Abajo = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.S
      );
      this.Izquierda = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.A
      );
      this.Derecha = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.D
      );
      this.TeclaDisparo = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    } else {
      this.Arriba = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT
      );
      this.Abajo = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE
      );
      this.Izquierda = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR
      );
      this.Derecha = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX
      );
      this.TeclaDisparo = escena.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO
      );
    }
  }

  //FUNCIÓN PARA GENERAR LA NAVE DENTRO DE LA ESCENA
  GenerarNave(escena) {
    //Cambiar esto al sprite de la nave correspondiente cuando esten
    if(this.jugador1)
    {this.cuerpo = escena.physics.add.sprite(400, 300, "pandora");}
    else{this.cuerpo = escena.physics.add.sprite(400, 300, "ravager");}
    
    //FILTROS DE COLOR
    this.filter = 0x00ff0000;
    this.filter2 = 0x00cf8d00; 

    //SE ASIGNAN LAS VARIABLES PARA EL MOVIMIENTO
    this.cuerpo.setDamping(true);
    this.cuerpo.setDrag(0.99);
    this.cuerpo.setMaxVelocity(this.velocidadMaxima);

    //SE ASIGNA CUANTO A DE REBOTAR LA NAVE AL CHOCARSE CON OTRO OBJETO
    this.cuerpo.setBounce(0.5, 0.5);

    //ASIGNAR COLLIDER A LA NAVE
    this.cuerpo.setCircle(24, 8, 20);

    //ASIGNAR COLLIDER A LA NAVE
    this.cuerpo.setCircle(this.radioCollider, 8, 8);

    //SE ASIGNAN LAS TECLAS AL JUGADOR
    this.AsignarTeclas(escena);

    //SE ASIGNA EL EVENTO DE DISPARO
    this.TeclaDisparo.on("down", (event) => {
      this.Disparar(escena);
    });
  }

  CogerBooster(booster) {
    console.log(booster);
    booster.cuerpo.disableBody(true, true);

    switch (booster.tipo) {
      case BoosterType.Speed:
        let velocidadInicial = this.velocidadActual;
        this.velocidadActual = velocidadInicial * 4;
        console.log(
          `Cambiada velocidad de ${this.jugador1 ? "Jugador1" : "Jugador2"} a ${
            this.velocidadActual
          }`
        );

        setTimeout(() => {
          this.velocidadActual = velocidadInicial;
          console.log(
            `Cambiada velocidad de ${
              this.jugador1 ? "Jugador1" : "Jugador2"
            } a ${velocidadInicial}`
          );
        }, 2000);
        break;

      case BoosterType.Damage:
        // ...
        break;

      case BoosterType.Shield:
        // ...
        break;

      default:
        break;
    }
  }
}
