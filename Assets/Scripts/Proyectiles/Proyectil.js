//Esta clase es más para usarla como base, se puede crear una para cada proyectil
class Proyectil{
    constructor( x, y, angulo, jugador1) {
        this.x = x;
        this.y = y;

        this.cuerpo = null;

        //ÁNGULO DEL PROYECTIL
        this.angulo = angulo;

        this.velocidad = 300;

        //SI EL PROYECTIL PERTENECE AL JUGADOR 1
        this.jugador1 = jugador1;

        this.daño = 10;
    }

    DestruirProyectil() {
        if (this.cuerpo) {
            this.cuerpo.destroy();
            console.log("Proyectil destruido");
        }
    }
    Fire(escena){
        this.cuerpo = escena.physics.add.sprite(this.x, this.y, "ProyectilBasico");
        this.cuerpo.rotation = this.angulo;
        escena.physics.velocityFromRotation(this.angulo, this.velocidad, this.cuerpo.body.velocity);
        this.AddColliders(escena);
    }

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
        if (this.jugador1 == false) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                this.Impacto.bind(this, escena, escena.nave1),
                null,
                escena
            );
        }
    }

    Impacto(proyectil, objetoImpacto) {
        if (objetoImpacto && objetoImpacto instanceof Nave) {
            objetoImpacto.vida = objetoImpacto.vida - this.daño;
            console.log(objetoImpacto.vida);
        }
        this.DestruirProyectil();
    }
}