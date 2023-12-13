class Misil extends Proyectil {
    constructor(x, y, angulo, jugador1) {
        //CONSTRUCTOR DE LA CLASE PADRE
        super(x, y, angulo, jugador1);

        // Puedes añadir propiedades específicas para Misil aquí
        this.explosivo = true;
        this.radioExplosion = 30;

        //SPRITE
        this.sprite = 8;
    }
    
    //REESCRIBIR FUNCION DISPARAR
    Disparar(escena){
            this.cuerpo = escena.physics.add.sprite(this.x, this.y, "boosterIcons", 7);
            this.cuerpo.setScale(1/35);
            this.cuerpo.rotation = this.angulo + (90 * 3.14/180);
            escena.physics.velocityFromRotation(this.angulo, this.velocidad, this.cuerpo.body.velocity);
            this.AddColliders(escena);
            //this.cuerpo.setScale(0.2);

            escena.time.delayedCall(5000, () => {
                this.DestruirProyectil();
            });
    }

    //REESCRIBIR FUNCION ADDCOLLIDERS
    AddColliders(escena) {

        //CON LA NAVE 2
        if (this.jugador1 == true) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave2.cuerpo,
                (proyectil, nave) => this.Impacto(escena, proyectil, escena.nave2),
                null,
                escena
            );
        }

        //CON LA NAVE1
        else if (this.jugador1 == false) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                (proyectil, nave) => this.Impacto(escena, proyectil, escena.nave1),
                null,
                escena
            );
        }
        
        //CON LA NAVE2
        escena.physics.add.overlap(
            this.cuerpo,
            escena.meteorites.getChildren(),
            (proyectil, meteorito) => {
                this.Impacto(escena, proyectil, meteorito);
            },
            null,
            escena
        );
        
        //this.cuerpo.setCircle(this.radioCollider, 5, 3);
    }

    //FUNCION QUE CREA LA EXPLOSION
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