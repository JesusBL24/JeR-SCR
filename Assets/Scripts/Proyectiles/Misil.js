class Misil extends Proyectil {
    constructor(x, y, velocidad, angulo, jugador1) {
        // Llama al constructor de la clase padre (Proyectil)
        super(x, y, velocidad, angulo, jugador1);

        // Puedes añadir propiedades específicas para Misil aquí
        this.explosivo = true;
        this.radioExplosion = 30;
    }

    // Puedes añadir métodos específicos para Misil si es necesario
    Explotar() {
        // Lógica específica para la explosión del Misil
    }
}