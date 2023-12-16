class Explosion {
    constructor( x, y, jugador1) {
        //CUERPO DE LA EXPLOSION
        this.cuerpo = null;
        
        //BOOLEANO DE SI ES DEL JUGADOR 1
        this.jugador1 = jugador1;

        //POSICION DE LA EXPLOSION
        this.x = x;
        this.y = y;

        //RADIO DEL COLLIDER
        this.radioCollider = 32;

        //OBJETOS GOLPEADOS
        this.nave1Golpeada = false;
        this.nave2Golpeada = false;
        this.meteoritosGolpeados = [];

        //DAÑO
        this.daño = 20;

        //ESCENA
        this.escena;

        //SPRITE
        this.anim = "explosionMisil";
     }

     //FUNCION QUE CREA LA EXPLOSION Y LE AÑADE LA ANIMACION
     Explotar(escena){
        this.cuerpo = escena.physics.add.sprite(this.x, this.y, this.anim );
        this.AddColliders(escena);

        this.cuerpo.anims.play('explosion', true)

        // Destruye la explosión después de 3 segundos
        escena.time.delayedCall(1000, () => {
            this.cuerpo.destroy();
        });
    }

    //FUNCION QUE AÑADE LOS COLLIDERS
     AddColliders(escena) {
        this.escena = escena;

            //CON LA NAVE 2
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave2.cuerpo,
                (explosion, nave) => this.Impacto(escena, explosion, escena.nave2),
                null,
                escena
            );
        
            //CON LA NAVE 1
            escena.physics.add.overlap(
                this.cuerpo,
                escena.nave1.cuerpo,
                (explosion, nave) => this.Impacto(escena, explosion, escena.nave1),
                null,
                escena
            );
        
        //CON LOS METEORITOS
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

    //FUNCION QUE REGULA EL IMPACTO DE LA EXPLOSION CON LOS OBJETOS
    Impacto(escena, explosion, objetoImpacto) {

        //DAÑO A LA NAVE1
        if (objetoImpacto && objetoImpacto instanceof Nave && objetoImpacto == escena.nave1  && this.nave1Golpeada != true) {
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
            console.log(objetoImpacto.vida);
            //console.log(objetoImpacto);
            this.nave1Golpeada = true
        }

        //DAÑO A LA NAVE 2
        else if(objetoImpacto && objetoImpacto instanceof Nave && objetoImpacto == escena.nave2 && this.nave2Golpeada != true){
            if(objetoImpacto.shield > 0){
                objetoImpacto.shield -= this.daño;
                if(objetoImpacto.shield < 0){
                    objetoImpacto.vida += objetoImpacto.shield;
                    objetoImpacto.shield = 0;
                }
            }
            else{
                objetoImpacto.vida = objetoImpacto.vida - this.daño;
            }
            objetoImpacto.Hit();
            console.log(objetoImpacto.vida);
            //console.log("A");
            this.nave2Golpeada = true;
        }

        //DAÑO A LOS METEORITOS
        else if(objetoImpacto && objetoImpacto.datos instanceof Meteorito && !this.meteoritosGolpeados.includes(objetoImpacto.datos)){
            console.log(objetoImpacto.datos);
            objetoImpacto.datos.Hit(this.jugador1, this.escena);
            objetoImpacto.datos.vida -= this.daño;
            //console.log("B");
            this.meteoritosGolpeados.push(objetoImpacto.datos);
        }
        //console.log("C");
    }
}