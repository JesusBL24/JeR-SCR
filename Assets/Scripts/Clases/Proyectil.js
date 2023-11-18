//Esta clase es más para usarla como base, se puede crear una para cada proyectil
class Proyectil{
    constructor() {
        //SPRITE DEL PROYECTIL (GAMEOBJECT)
        this.cuerpo;

        //VELOCIDAD DEL PROYECTIL
        this.velocidad;
        //ÁNGULO DEL PROYECTIL
        this.angulo;

        //SI EL PROYECTIL PERTENECE AL JUGADOR 1
        this.jugador1 = true;
    }

    //FUNCIÓN DE ACTUALIZACIÓN DEL PROYECTIL
    Update(escena){

    }

    //FUNCIÓN DE MOVMIENTO DEL PROYECTIL
    Movimiento(){

    }
}