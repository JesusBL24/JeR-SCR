class Ametralladora extends Proyectil {
    constructor(x, y, velocidad, angulo, jugador1) {
        // CONSTRUCTOR DE LA CLASE PADRE
        super(x, y, velocidad, angulo, jugador1);

        //CADENCIA DE DISPARO
        this.cadenciaDisparo  = 300;

        //SPRITE
        this.sprite = "proyectilAmetralladora";
    }
}