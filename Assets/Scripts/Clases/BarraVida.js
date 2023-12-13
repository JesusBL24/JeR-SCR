class BarraVida{
    constructor(escena, x, y, type){
        this.barraTotal;
        this.barraActual;
        this.borde1;

        this.escena = escena;

        this.x = x;
        this.y = y;

        this.width = 300;
        this.height = 30;

        //Tipo de barra: 0 Izq->Dch // 1 Dch->Izq
        this.type = type;

        //A qué pertenece la barra
        this.object;
        //console.log(this.object)

        //TOTAL DE LA BARRA Y PORCENTAJE ACTUAL
        this.capacity;
        this.percentage;

    }

    Init(object){
        this.object = object;
        this.capacity = this.object.vidaTotal;
        this.percentage = this.object.vida * 100 / this.object.vidaTotal;

        this.borde1 = this.escena.add.rectangle(this.x-5, this.y-5, this.width+10, this.height+10, 0x222222);
        this.borde1.setOrigin(0);

        this.barraTotal = this.escena.add.rectangle(this.x, this.y, this.width, this.height, 0xaaaaaa);
        this.barraTotal.setOrigin(0);


        if(this.type == 0){    
            this.barraActual = this.escena.add.rectangle(this.x, this.y, this.width * this.percentage/100, this.height, 0xff0000);
            this.barraActual.setOrigin(0);
        }
        else{
            this.barraActual = this.escena.add.rectangle(this.x + (this.width * (100-this.percentage)/100), this.y, this.width * this.percentage/100, this.height, 0xff0000);
            this.barraActual.setOrigin(0);
        }
    }

    Update(){
        this.percentage =  this.object.vida * 100 / this.object.vidaTotal;

        if(this.type == 0){    
            this.barraActual.setSize(this.width * this.percentage/100, this.height);
        }
        else{
            this.barraActual.setX(this.x + (this.width * (100-this.percentage)/100));
            this.barraActual.setSize(this.width * this.percentage/100, this.height);        
        }
        //console.log("AAA")
    }

    GetPlayerAmmo(){
        if(this.object.municion != NaN){
            return this.object.municion;
        }
        else{
            return "∞"
        }
    }
}