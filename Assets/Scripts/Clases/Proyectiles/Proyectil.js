//Esta clase es más para usarla como base, se puede crear una para cada proyectil
class Proyectil{
    constructor( x, y, angulo, jugador1) {
        //VARIABLES DE POSICION
        this.x = x;
        this.y = y;

        //CUERPO
        this.cuerpo = null;

        //RADIO DEL COLLIDER
        this.radioCollider = 3;

        //ÁNGULO DEL PROYECTIL
        this.angulo = angulo;

        //VELOCIDAD A LA QUE AVANZA
        this.velocidad = 300;

        //SI EL PROYECTIL PERTENECE AL JUGADOR 1
        this.jugador1 = jugador1;

        //DAÑO QUE HACE
        this.daño = 10;
        
        //CADENCIA DEL PROYECTIL
        this.cadenciaDisparo  = 1000;

        //ESCENA
        this.escena;

        this.sprite = "proyectilBasico";
    }

    //LIMPIEZA DEL PRPYECTIL
    DestruirProyectil() {
        if (this.cuerpo) {
            this.cuerpo.destroy();
            //console.log("Proyectil destruido");
        }
    }

    //GENERAR OVERLAPS Y COLLIDERS
    AddColliders(escena) {
        this.escena = escena;

        //CON LA NAVE2
        if (this.jugador1 == true) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave2.cuerpo,
                this.Impacto.bind(this, escena, escena.nave2),
                null,
                escena
            );
        }
        //CON LA NAVE1
        else if (this.jugador1 == false) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                this.Impacto.bind(this, escena, escena.nave1),
                null,
                escena
            );
        }
        //CON LOS METEORITOS
        escena.physics.add.overlap(
            this.cuerpo,
            escena.meteorites.getChildren(),
            (proyectil, meteorito) => {
                this.Impacto(proyectil, meteorito);
            },
            null,
            escena
        );
        
        //this.cuerpo.setCircle(this.radioCollider,1,1);
    }

    //FUNCIÓN QUE SE EJECUTA AL IMPACTAR
    Impacto(proyectil, objetoImpacto,) {

        //DAÑO A LA NAVE ENEMIGA
        if (objetoImpacto && objetoImpacto instanceof Nave) {
            if(objetoImpacto.shield > 0){
                objetoImpacto.shield -= this.daño;

                if(objetoImpacto.shield < 0){
                    objetoImpacto.vida += objetoImpacto.shield;
                    objetoImpacto.shield = 0;

                    this.escena.events.emit('booster_perdido', {
                        tipo: BoosterType.Shield,
                        esjugador1: this.jugador1
                      });
                }
            }
            else{
                objetoImpacto.vida = objetoImpacto.vida - this.daño;
            }
            objetoImpacto.Hit();
            //console.log(objetoImpacto.vida);
        }
        else if(objetoImpacto && objetoImpacto.datos instanceof Meteorito){
            objetoImpacto.datos.vida -= this.daño;
            objetoImpacto.datos.Hit(this.jugador1, this.escena);
            //console.log(objetoImpacto.datos.vida);
        }
 

        this.DestruirProyectil();
    }

    //DISPARO DEL PROYECTIL
    Disparar(escena){
        this.cuerpo = escena.physics.add.sprite(this.x, this.y, this.sprite);
        //this.cuerpo.setOrigin(0.5);
        this.cuerpo.setScale(0.3);
        this.cuerpo.rotation = this.angulo;
        escena.physics.velocityFromRotation(this.angulo, this.velocidad, this.cuerpo.body.velocity);
        this.AddColliders(escena);
        escena.time.delayedCall(5000, () => {
            this.DestruirProyectil();
        });
    }
}