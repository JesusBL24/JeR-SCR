class Misil extends Proyectil {
    constructor(x, y, angulo, jugador1) {
        // Llama al constructor de la clase padre (Proyectil)
        super(x, y, angulo, jugador1);

        // Puedes añadir propiedades específicas para Misil aquí
        this.explosivo = true;
        this.radioExplosion = 30;
        
    }
    
    Disparar(escena){
            this.cuerpo = escena.physics.add.sprite(this.x, this.y, "proyectilMisil");
            this.cuerpo.rotation = this.angulo;
            escena.physics.velocityFromRotation(this.angulo, this.velocidad, this.cuerpo.body.velocity);
            this.AddColliders(escena);

            escena.time.delayedCall(5000, () => {
                this.DestruirProyectil();
            });
    }

    AddColliders(escena) {
        if (this.jugador1 == true) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave2.cuerpo,
                (proyectil, nave) => this.Impacto(escena, proyectil, escena.nave2),
                null,
                escena
            );
        }
        else if (this.jugador1 == false) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                (proyectil, nave) => this.Impacto(escena, proyectil, escena.nave1),
                null,
                escena
            );
        }
        
        escena.physics.add.overlap(
            this.cuerpo,
            escena.meteorites.getChildren(),
            (proyectil, meteorito) => {
                this.Impacto(escena, proyectil, meteorito);
            },
            null,
            escena
        );
        
        this.cuerpo.setCircle(this.radioCollider, 5, 3);
    }

    Explotar(escena){
        var explosion = new Explosion(this.cuerpo.x, this.cuerpo.y, this.jugador1);
        explosion.Explotar(escena);
        //this.DestruirProyectil();
    }

    //FUNCIÓN QUE SE EJECUTA AL IMPACTAR
    Impacto(escena, proyectil, objetoImpacto) {

        //DAÑO A LA NAVE ENEMIGA
        if (objetoImpacto && objetoImpacto instanceof Nave) {
            this.Explotar(escena);
            //console.log(objetoImpacto.vida);
            //console.log("A");
        }
        else if(objetoImpacto && objetoImpacto.datos instanceof Meteorito){
            this.Explotar(escena);
            //console.log(objetoImpacto.datos.vida);
            //console.log("B");
        }
        //console.log("C");
        this.DestruirProyectil();
    }
}