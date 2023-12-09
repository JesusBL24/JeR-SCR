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
        this.tipoDisparo = 0;

        //Collider multiple
        this.radioCollider = 24;
        //this.c2 = null;

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
        switch(this.tipoDisparo){
            case 0:
                // Crea un nuevo círculo en la posición de la nave
                const nuevoCirculo = new Phaser.Geom.Circle(this.cuerpo.x, this.cuerpo.y, 10);

                // Crea un sprite asociado al nuevo círculo
                const nuevoSprite = escena.add.sprite(nuevoCirculo.x, nuevoCirculo.y, 'pandora awww');

                // Establece propiedades adicionales si es necesario
                nuevoSprite.setOrigin(0.5, 0.5);
                nuevoSprite.setScale(0.5);

                // Agrega el nuevo sprite a la escena o a un grupo de sprites
                escena.physics.add.existing(nuevoSprite);

                break;
            case 1:
                console.log("1");
                break;
            case 2:
                console.log("0");
                this.tipoDisparo = 1;
                break;
            case 3:
                console.log("1");
                break;
        }
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
        this.cuerpo = escena.physics.add.sprite(400, 300, 'pandora');
        

        //SE ASIGNAN LAS VARIABLES PARA EL MOVIMIENTO
        this.cuerpo.setDamping(true);
        this.cuerpo.setDrag(0.99);
        this.cuerpo.setMaxVelocity(this.velocidadMaxima);

        //SE ASIGNA CUANTO A DE REBOTAR LA NAVE AL CHOCARSE CON OTRO OBJETO
        this.cuerpo.setBounce(.5,.5);

        //ASIGNAR COLLIDER A LA NAVE
        this.cuerpo.setCircle(this.radioCollider,8 , 8);

        //SE ASIGNAN LAS TECLAS AL JUGADOR
        this.AsignarTeclas(escena);

        //SE ASIGNA EL EVENTO DE DISPARO
        this.TeclaDisparo.on('down', event =>
        {
            this.Disparar(escena);
        });
    }
}