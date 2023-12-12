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
    }

    //LIMPIEZA DEL PRPYECTIL
    DestruirProyectil() {
        if (this.cuerpo) {
            this.cuerpo.destroy();
            console.log("Proyectil destruido");
        }
    }

    //GENERAR OVERLAPS Y COLLIDERS
    AddColliders(escena) {
        if (this.jugador1 == true) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave2.cuerpo,
                this.Impacto.bind(this, escena, escena.nave2),
                null,
                escena
            );
        }
        else if (this.jugador1 == false) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                this.Impacto.bind(this, escena, escena.nave1),
                null,
                escena
            );
        }
        
        escena.physics.add.overlap(
            this.cuerpo,
            escena.meteorites.getChildren(),
            (proyectil, meteorito) => {
                this.Impacto(proyectil, meteorito);
            },
            null,
            escena
        );
        
        this.cuerpo.setCircle(this.radioCollider, 5, 3);
    }

    //FUNCIÓN QUE SE EJECUTA AL IMPACTAR
    Impacto(proyectil, objetoImpacto) {

        //DAÑO A LA NAVE ENEMIGA
        if (objetoImpacto && objetoImpacto instanceof Nave) {
            objetoImpacto.vida = objetoImpacto.vida - this.daño;
            //console.log(objetoImpacto.vida);
        }
        else if(objetoImpacto && objetoImpacto.datos instanceof Meteorito){
            objetoImpacto.datos.vida -= this.daño;
            //console.log(objetoImpacto.datos.vida);
        }

        this.DestruirProyectil();
    }

    //DISPARO DEL PROYECTIL
    Disparar(escena){
        this.cuerpo = escena.physics.add.sprite(this.x, this.y, "ProyectilBasico");
        this.cuerpo.rotation = this.angulo;
        escena.physics.velocityFromRotation(this.angulo, this.velocidad, this.cuerpo.body.velocity);
        this.AddColliders(escena);
    }
}