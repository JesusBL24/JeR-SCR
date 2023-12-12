class Explosion {
    constructor( x, y, jugador1) {
        this.cuerpo = null;
        
        this.jugador1 = jugador1;

        this.x = x;
        this.y = y;
        this.radioCollider = 32;

        this.nave1Golpeada = false;
        this.nave2Golpeada = false;
        this.daño = 20;
     }

     Explotar(escena){
        this.cuerpo = escena.physics.add.sprite(this.x, this.y, "explosionMisil");
        this.AddColliders(escena);

        // Destruye la explosión después de 3 segundos
        escena.time.delayedCall(1000, () => {
            this.cuerpo.destroy();
        });
    }

     AddColliders(escena) {
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave2.cuerpo,
                (explosion, nave) => this.Impacto(escena, explosion, escena.nave2),
                null,
                escena
            );
        
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                (explosion, nave) => this.Impacto(escena, explosion, escena.nave1),
                null,
                escena
            );
        
        
        escena.physics.add.overlap(
            this.cuerpo,
            escena.meteorites.getChildren(),
            (proyectil, meteorito) => {
                this.Impacto(escena,proyectil, meteorito);
            },
            null,
            escena
        );
        this.cuerpo.setCircle(this.radioCollider);
    }

    Impacto(escena, explosion, objetoImpacto) {

        //DAÑO A LA NAVE ENEMIGA
        if (objetoImpacto && objetoImpacto instanceof Nave && objetoImpacto == escena.nave1  && this.nave1Golpeada != true) {
            objetoImpacto.vida = objetoImpacto.vida - this.daño;
            objetoImpacto.Hit();
            console.log(objetoImpacto.vida);
            //console.log(objetoImpacto);
            this.nave1Golpeada = true
        }
        else if(objetoImpacto && objetoImpacto instanceof Nave && objetoImpacto == escena.nave2 && this.nave2Golpeada != true){
            objetoImpacto.vida = objetoImpacto.vida - this.daño;
            objetoImpacto.Hit();
            console.log(objetoImpacto.vida);
            console.log("A");
            this.nave2Golpeada = true;
        }
        else if(objetoImpacto && objetoImpacto.datos instanceof Meteorito){
            //console.log(objetoImpacto.datos.vida);
            console.log("B");
        }
        //console.log("C");
    }
}