class Nave {
  constructor() {
    //SPRITE DE LA NAVE (GAMEOBJECT)
    this.cuerpo = null;

    //SI EL JUGADOR ES EL JUGADOR 1 O EL 2
    this.jugador1 = true;

    //VIDA DE LA NAVE
    this.vidaTotal = 100;
    this.isAlife = true;
    this.vida = this.vidaTotal;
    
    //VELOCIDAD MÁXIMA DE LA NAVE
    this.velocidadMaxima = 200;

    //VELOCIDAD DE ROTACIÓN DE LA NAVE
    this.velocidadDeRotacion = 200;
    this.velocidadActual = 200;

    //TIPO DE DISPARO
    this.tipoDisparo = 0;
    this.municion = NaN;

    //ESCUDO ACTIVO?
    this.shield = 0;
    this.shieldHealth = 35;
    this.shieldTexture;

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

    //SONIDOS
    this.thrust = null;
    this.shoot = null;
  }
  //FUNCIÓN DE ACTUALIZACIÓN DE LA NAVE
  Update(escena) {
    this.Movimiento(escena);
    if (this.TeclaDisparo.isDown) {
      this.Disparar(escena);
    }
    if(this.shield > 0){
      this.shieldTexture.setVisible(true);
      this.shieldTexture.x = this.cuerpo.x;
      this.shieldTexture.y = this.cuerpo.y;
      this.shieldTexture.anims.play('shield', true)
    }
    else{
      this.shieldTexture.setVisible(false);
    }
  }

  //FUNCION QUE SE LLAMA CUANDO LA NAVE ES DESTRUIDA
  Destruccion(escena){
    this.isAlife = false;
    var explosion = new Explosion(this.cuerpo.x, this.cuerpo.y, this.jugador1);
    explosion.anim = "explosionNaveAnim";
    //explosion.daño = 0;
    explosion.Explotar(escena);
    this.cuerpo.setVisible(false);
  }
  //FUNCION DE FEEDBACK DE DAÑO LA NAVE
  Hit(){
    if(this.vida < 0){this.vida = 0;}
    Phaser.Actions.SetTint([this.cuerpo], this.filter);
    setTimeout(() =>{
        this.cuerpo.clearTint();
    }, 150);

    if(this.vida <= 20 && this.vida > 10){ this.intervalId = this.LowHeal(800, false);}
    else if(this.vida > 0 &&this.vida <= 10){this.intervalId = this.LowHeal(600, true);}
    else if(this.vida <= 0 && this.isAlife)
    {this.Destruccion(this.escena);}
  }

  //FUNCIÓN DE PARPADEO AL TENER POCA VIDA
  LowHeal(frecuencia,tipo){

    //SI YA HAY UN PARPADEO LO ELIMINA
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
  }
    //DURACION DEL RECOLOR
    var duracion = 150;

    //TIPO DE COLOR
    const color = tipo ? this.filter : this.filter2;

    //INTERVALO DE PARPADEO
    const intervalId = setInterval(() => {
        Phaser.Actions.SetTint([this.cuerpo], color);
        setTimeout(() => {
            this.cuerpo.clearTint();
        }, duracion);
    }, frecuencia);
  
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

    if(!this.thrust.isPlaying)
      this.thrust.play();
    } else {
      this.cuerpo.setAcceleration(0);
      this.thrust.pause();
    }
    //PARA GIRAR LATERALMENTE
    if (this.Izquierda.isDown) {
      this.cuerpo.setAngularVelocity(-this.velocidadDeRotacion);
    } else if (this.Derecha.isDown) {
      this.cuerpo.setAngularVelocity(this.velocidadDeRotacion);
    } else {
      this.cuerpo.setAngularVelocity(0);
    }
  }

  //FUNCIÓN DE DISPARO DE LA NAVE, POSEE CADENCIA DE DISPARO
  Disparar(escena) {
    if(!escena.finDePartida) {
      //VARIABLE PARA CALCULO DE CADENCIA
      const tiempoActual = escena.time.now;

      //CALCULO DE SI SE PUEDE DISPARAR
      if (tiempoActual - this.ultimoDisparo > this.cadenciaDisparo) {
        this.ultimoDisparo = tiempoActual;

        switch (this.tipoDisparo) {
          //PROYECTIL BASICO
          case 0:
            var nuevoProyectil = new Proyectil(
                this.cuerpo.x,
                this.cuerpo.y,
                this.cuerpo.rotation,
                this.jugador1,
            );

            nuevoProyectil.Disparar(escena);
            break;

          //AMETRALLADORA
          case 1:
            var nuevoProyectil = new Ametralladora(
                this.cuerpo.x,
                this.cuerpo.y,
                this.cuerpo.rotation,
                this.jugador1,
            );

            nuevoProyectil.Disparar(escena);
            break;

          //DOBLEYECTIL
          case 2:
            var nuevoProyectil = new Dobleyectil(
                this.cuerpo.x,
                this.cuerpo.y,
                this.cuerpo.rotation,
                this.jugador1,
            );

            nuevoProyectil.Disparar(escena);
            break;

          //MISIL
          case 3:
            var nuevoProyectil = new Misil(
                this.cuerpo.x,
                this.cuerpo.y,
                this.cuerpo.rotation,
                this.jugador1,
            );

            nuevoProyectil.Disparar(escena);
            break;
        }
        //SE IGUALA LA CADENCIA A LA DEL TIPO DE PROYECTIL
        this.cadenciaDisparo = nuevoProyectil.cadenciaDisparo;
        //SE REPRODUCE EL SONIDO DE DISPARO
        this.shoot.play();

        //SE COMPRUEBA MUNICIÓN Y SI HACE FALTA SE CAMBIA EL ARMA
        if(this.municion != NaN){
          this.municion--;

          if(this.municion == 0){
            this.municion = NaN;
            this.tipoDisparo = 0;

            this.escena.events.emit('booster_perdido', {
              tipo: BoosterType.Damage,
              esjugador1: this.jugador1
            });
          }
        }

      }
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
    this.escena = escena;
    if(this.jugador1)
    {
      this.cuerpo = escena.physics.add.sprite(-950, 0, "pandora");
    }
    else{
      this.cuerpo = escena.physics.add.sprite(950, 0, "ravager");
      this.cuerpo.angle = 180;
    }
    
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

    //SE ASIGNA LA TEXTURA DEL ESCUDO
    this.shieldTexture = escena.physics.add.sprite(this.cuerpo.x, this.cuerpo.y, "shield");
    this.shieldTexture.setScale(1/14);

    //ASIGNAMOS EL SONIDO AL ACELERAR Y EL DE DISPARAR
    if(this.jugador1) {
      this.thrust = escena.sound.add('thrust');
      this.shoot = escena.sound.add('disparo');
    }
    else {
      this.thrust = escena.sound.add('thrust2');
      this.shoot = escena.sound.add('disparo2');
    }
    this.thrust.volume = 0.1;
    this.shoot.volume = 0.1;
  }

  //FUNCIÓN CON LA QUE SE ACTIVA UN BOOSTER
  CogerBooster(booster) {
    //console.log(booster);
    //booster.cuerpo.disableBody(true, true);

    switch (booster.tipo) {
      // Para el booster de velocidad: aumentamos la velocidad del personaje x1.15 hasta el final de la ronda
      case BoosterType.Speed:
        this.velocidadDeRotacion *= 1.15; // Aumentamos la velocidad de rotación actual

        this.escena.events.emit('booster_obtenido', {
          tipo: BoosterType.Speed,
          esjugador1: this.jugador1
        });
        break;

      // Para el booster de daño
      case BoosterType.Damage:
        // Esto escogeria, aleatoriamente, cualquiera de los tipos de armas
        let max = 3;
        let min = 1;
        this.tipoDisparo = Math.floor(Math.random() * (max) + min);

        switch(this.tipoDisparo){
          case 0:
            this.municion = NaN;
            break;
          case 1:
            this.municion = 20;
            break;
          case 2:
            this.municion = 10;
            break;
          case 3:
            this.municion = 5;
            break;
        }

        this.escena.events.emit('booster_obtenido', {
          tipo: BoosterType.Damage,  
          esjugador1: this.jugador1,
          arma: this.tipoDisparo,
        });
        break;

      // Para el booster de escudo: proporciona un escudo
      case BoosterType.Shield:
        this.shield = this.shieldHealth;

        this.escena.events.emit('booster_obtenido', {
          tipo: BoosterType.Shield,
          esjugador1: this.jugador1
        });
        break;

      default:
        break;
    }
  }
}
