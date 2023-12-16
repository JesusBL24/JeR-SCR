class BarraVida{
    constructor(escena, x, y, type){
        //ELEMENTOS A DIBUJAR
        this.barraTotal;
        this.barraActual;
        this.borde1;

        //ESCENA
        this.escena = escena;

        //COORDENADAS
        this.x = x;
        this.y = y;

        //DIMENSIONES
        this.width = 300;
        this.height = 30;

        //TIPO DE BARRA: 0 Izq->Dch // 1 Dch->Izq
        this.type = type;

        //A QUÉ PERTENECE LA BARRA DE VIDA
        this.object;
        //console.log(this.object)

        //TOTAL DE LA BARRA Y PORCENTAJE ACTUAL
        this.capacity;
        this.percentage;
    }

    //FUNCIÓN DE INICIALIZACIÓN DE LA BARRA DE VIDA
    Init(object){
        
        //SE ESTABLECE A QUIEN PERTENECE LA BARRA DE VIDA Y SU TAMAÑO
        this.object = object;
        this.capacity = this.object.vidaTotal;
        this.percentage = this.object.vida * 100 / this.object.vidaTotal;

        //SE PINTA EL TOTAL Y EL BORDE EXTERIOR
        this.borde1 = this.escena.add.rectangle(this.x-5, this.y-5, this.width+10, this.height+10, 0x222222);
        this.borde1.setOrigin(0);

        this.barraTotal = this.escena.add.rectangle(this.x, this.y, this.width, this.height, 0xaaaaaa);
        this.barraTotal.setOrigin(0);

        //SE PINTA LA VIDA RESTANTE SEGÚN EL TIPO DE BARRA DE VIDA
        if(this.type == 0){    
            this.barraActual = this.escena.add.rectangle(this.x, this.y, this.width * this.percentage/100, this.height, 0xff0000);
            this.barraActual.setOrigin(0);
        }
        else{
            this.barraActual = this.escena.add.rectangle(this.x + (this.width * (100-this.percentage)/100), this.y, this.width * this.percentage/100, this.height, 0xff0000);
            this.barraActual.setOrigin(0);
        }
    }

    //FUNCIÓN DE ACTUALIZACIÓN DE LA BARRA DE VIDA
    Update(){
        this.percentage =  this.object.vida * 100 / this.object.vidaTotal;

        //SE ACTUALIZA EL EL TAMAÑO DE LA BARRA DE VIDA RESTANTE
        if(this.type == 0){    
            this.barraActual.setSize(this.width * this.percentage/100, this.height);
        }
        else{
            this.barraActual.setX(this.x + (this.width * (100-this.percentage)/100));
            this.barraActual.setSize(this.width * this.percentage/100, this.height);        
        }
        //console.log("AAA")
    }

    //FUNCIÓN QUE DEVUELVE LA MUNICIÓN DEL JUGADOR
    GetPlayerAmmo(){
        if(this.object.tipoDisparo == 0){
            return "∞";
        }
        else{
            return this.object.municion;
        }
    }
}