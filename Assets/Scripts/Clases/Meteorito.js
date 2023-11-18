class Meteorito{
    constructor() {
        //SPRITE DEL METEORITO (GAMEOBJECT)
        this.cuerpo;

        //VIDA DEL METEORITO
        this.vida;

        //VELOCIDAD MÁXIMA DEL METEORITO
        this.velocidadMaxima;
        //VELOCIDAD Y DIRECCIÓN DE ROTACIÓN DEL METEORITO
        this.velocidadDeRotacion;
        this.direccionDeRotacion;

        //TAMAÑO DEL METEORITO
        this.size;
        //TIPO (METEORITO O CHATARRA)
        this.tipo;

        //SI EL METEORITO TIENE UN BOOSTER
        this.tieneBooster = false;
        //BOOSTER QUE TIENE EL METEORITO (SI ES ALEATORIO, ESTO SE PUEDE ELIMINAR)
        this.booster = null;

    }

    //FUNCIÓN DE ACTUALIZACIÓN DEL METEORITO
    Update(escena){

    }

    //FUNCIÓN DE MOVIMIENTO DEL METEORITO
    Movimiento(){

    }

    //FUNCIÓN QUE HACE APARECER UN BOOSTER
    SpawnBooster(){

    }

    //FUNCIÓN QUE HACE APARECER METEORITOS MÁS PEQUEÑOS
    SpawnMeteorito(escena){

    }

}