class Nave{
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
        this.velocidadMaxima = 200;
        //VELOCIDAD DE ROTACIÓN DE LA NAVE
        this.velocidadDeRotacion = 100;

        //TIPO DE DISPARO
        this.tipoDisparo = null;


        //TECLAS DE LAS QUE DISPONE EL JUGADOR
        this.Arriba = null;
        this.Abajo = null;
        this.Izquierda = null;
        this.Derecha = null;
        this.TeclaDisparo = null;
    }

    //FUNCIÓN DE ACTUALIZACIÓN DE LA NAVE
    Update(escena){
        this.Movimiento(escena);
    }


    //FUNCIÓN DE MOVIMIENTO DE LA NAVE
    Movimiento(escena){
        //PARA ACELERAR
        if (this.Arriba.isDown)
        {
            escena.physics.velocityFromRotation(this.cuerpo.rotation, 200, this.cuerpo.body.acceleration);
        }
        else
        {
            this.cuerpo.setAcceleration(0);
        }
        //PARA GIRAR LATERALMENTE
        if(this.Izquierda.isDown) {
            this.cuerpo.setAngularVelocity(-this.velocidadDeRotacion);
        }else if(this.Derecha.isDown) {
            this.cuerpo.setAngularVelocity(this.velocidadDeRotacion);
        }else {
            this.cuerpo.setAngularVelocity(0);
        }

        //ESTO ES DE MOMENTO PARA QUE EL JUGADOR NO SE VAYA A MORDOR
        escena.physics.world.wrap(this.cuerpo, 32);
    }

    //FUNCIÓN DE DISPARO DE LA NAVE
    Disparar(escena){
        console.log("Disparando");
    }

    //FUNCIÓN PARA ASIGNAR LOS CONTROLES DE LA NAVE
    AsignarTeclas(escena){
        if(this.jugador1){
            this.Arriba = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.Abajo = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.Izquierda = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.Derecha = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.TeclaDisparo = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }else{
            this.Arriba = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);
            this.Abajo = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE);
            this.Izquierda = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
            this.Derecha = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX);
            this.TeclaDisparo = escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
        }
    }

    //FUNCIÓN PARA GENERAR LA NAVE DENTRO DE LA ESCENA
    GenerarNave(escena){
        //Cambiar esto al sprite de la nave correspondiente cuando esten
        this.cuerpo = escena.physics.add.sprite(100, 450, 'dude');

        //SE ASIGNAN LAS VARIABLES PARA EL MOVIMIENTO
        this.cuerpo.setDamping(true);
        this.cuerpo.setDrag(0.99);
        this.cuerpo.setMaxVelocity(this.velocidadMaxima);

        //SE ASIGNAN LAS TECLAS AL JUGADOR
        this.AsignarTeclas(escena);

        this.TeclaDisparo.on('down', event =>
        {
            this.Disparar(escena);
        });
    }


}