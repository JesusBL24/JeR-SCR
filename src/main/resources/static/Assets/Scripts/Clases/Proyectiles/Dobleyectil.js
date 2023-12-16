class Dobleyectil extends Proyectil {
    constructor(x, y, velocidad, angulo, jugador1) {
        
        //CONSTRUCTOR DEL PADRE
        super(x, y, velocidad, angulo, jugador1);
        
        //OFFSET
        this.offset = 10;

        //CADENCIA DE DISPARO
        this.cadenciaDisparo  = 1000;

        //SPRITE
        this.sprite = "dobleyectil";
    }

    //DISPARO DEL PROYECTIL
    Disparar(escena){
        //AJUSTES DE POSICION DEL PROYECTIL PRINCIPAL
        const offsetXFromShip = this.offset * Math.cos(this.angulo + Math.PI / 2);
        const offsetYFromShip = this.offset * Math.sin(this.angulo + Math.PI / 2);
        this.x = this.x - offsetXFromShip;
        this.y = this.y - offsetYFromShip;

        //CREACION DE PROYECTIL
        this.cuerpo = escena.physics.add.sprite(this.x, this.y, this.sprite);
        this.cuerpo.setScale(0.3);

        this.cuerpo.rotation = this.angulo;
        escena.physics.velocityFromRotation(this.angulo, this.velocidad, this.cuerpo.body.velocity);
        this.AddColliders(escena);

        //GENERACIÓN DE UN PROYECTIL SECUNDARIO, AJUSTADO PARA QUE SALGA PARALELO
        var nuevoProyectil = new Proyectil(
            this.cuerpo.x + 2*(this.offset * Math.cos(this.angulo + Math.PI / 2)),
            this.cuerpo.y + 2*(this.offset * Math.sin(this.angulo + Math.PI / 2)),
            this.cuerpo.rotation,
            this.jugador1,
            );
        nuevoProyectil.sprite = this.sprite;
        nuevoProyectil.Disparar(escena);
        escena.time.delayedCall(5000, () => {
        this.DestruirProyectil();
        });
    }
    
    
}