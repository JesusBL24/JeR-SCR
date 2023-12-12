class Ametralladora extends Proyectil {
    constructor(x, y, velocidad, angulo, jugador1) {
        // LLAMA AL CONSTRUCTOR DE LA CLASE PADRE
        super(x, y, velocidad, angulo, jugador1);

        this.cadenciaDisparo  = 300;
    }
}