class MeteoritoOnline{
    constructor() {
        //SPRITE DEL METEORITO (GAMEOBJECT)
        this.cuerpo = null;

        //VIDA DEL METEORITO
        this.vida;
        this.vidaTotal;

        //VELOCIDAD MÁXIMA DEL METEORITO
        this.velocidadMaxima = 100;

        //VELOCIDAD Y DIRECCIÓN DE ROTACIÓN DEL METEORITO
        this.velocidadDeRotacion = 0.1;
        this.direccionDeRotacion;

        //TAMAÑO DEL METEORITO
        this.size;
        //TIPO (0 - METEORITO | 1 - CHATARRA)
        this.tipo;
        //FILTRO DE COLOR
        this.filter;

        //SI EL METEORITO TIENE UN BOOSTER
        this.tieneBooster = false;

        //SCORE
        this.score = 0;
    }

    //FUNCIÓN DE ACTUALIZACIÓN DEL METEORITO
    Update(escena){
        this.Movimiento();
    }

    //FUNCIÓN DE MOVIMIENTO DEL METEORITO
    Movimiento(){
        this.cuerpo.setAngle(this.cuerpo.angle + this.velocidadDeRotacion * this.direccionDeRotacion);
        //console.log(this.cuerpo.angle, this.velocidadDeRotacion)
    }

    //FUNCIÓN QUE DA AL JUGADOR UN BOOSTER
    SpawnBooster(jugador1, escena){
        //console.log("Booster pa ti");
        console.log(jugador1);
        var booster = new Booster(this.GetRandomBoosterType(), {x:-1000, y:-1000});

        if(jugador1){
            escena.nave1.CogerBooster(booster);
        }
        else{
            escena.nave2.CogerBooster(booster);
        }
    }

    //FUNCIÓN PARA DEVOLVER UN TIPO DE BOOSTER ALEATORIO
    GetRandomBoosterType() {
        const types = Object.values(BoosterType);
        const randomIndex = Math.floor(Math.random() * types.length);
        return types[randomIndex];
    }
      
    //FUNCIÓN LLAMADA CUANDO SE GOLPEA EL METEORITO
    Hit(jugador1, escena){

        //HACE UN DESTELLO DE COLOR
        Phaser.Actions.SetTint([this.cuerpo], this.filter);
        setTimeout(() =>{
            this.cuerpo.clearTint();
        }, 150);

        //SI SE DESTRUYE Y TIENE BOOSTER LO DA
        if(this.vida <= 0){
            if(this.tieneBooster){
                //console.log(jugador1);
                this.SpawnBooster(jugador1, escena);
                this.tieneBooster = false;
            }

            //PUNTUACION
            if(jugador1){
                escena.nave1.score += this.score;
            }
            else{
                escena.nave2.score += this.score;
            }

            //DESTRUIR EL CUERPO
            this.cuerpo.destroy();
        }
    }

    //FUNCIÓN QUE HACE APARECER METEORITOS
    SpawnMeteoritoOnline(escena, size, tipo, x, y, direccionDeRotacion){

        //SELECCIÓN ENTRE METEORITO O CHATARRA
        this.escena = escena;
        this.tipo = tipo;
        this.direccionDeRotacion = direccionDeRotacion;
        this.size = size;


        //SI ES METEORITO
        if(this.tipo === 0){
            this.filter = 0x00ff0000;
            this.tieneBooster = Math.random() >= 0.20 * (this.size+1);
            this.cuerpo = escena.physics.add.sprite(400, 400, 'meteorite', this.size);
            this.cuerpo.setScale(1/16);

            this.vidaTotal = (3-this.size) * 20;
            this.vida = this.vidaTotal;

            //HITBOXES
            switch(this.size){
                case 0:
                    this.cuerpo.setSize(950, 950);
                    this.score = 50;
                    break;
                case 1:
                    this.cuerpo.setSize(700, 700, 110, 100);
                    this.score = 30
                    break;
                case 2:
                    this.cuerpo.setSize(450, 450, 250, 250);
                    this.score = 10;
                    break;
                default:
                    break;
            }
        }

        //SI ES CHATARRA
        else{
            this.filter = 0x00666666;
            this.tieneBooster = false;
            this.cuerpo = escena.physics.add.sprite(400, 400, 'trash' + this.size);
            this.cuerpo.setScale(1/16);

            this.vidaTotal = (this.size * 200);
            this.vida = this.vidaTotal;
            this.score = 25;

            //HITBOXES
            switch(this.size){
                case 1:
                    this.cuerpo.setSize(500, 500);
                    break;
                case 2:
                    this.cuerpo.setSize(500, 500);
                    break;
                case 3:
                    this.cuerpo.setSize(370, 370);
                    break;
                case 4:
                    this.cuerpo.setSize(700, 700, 20);
                    break;
                case 5:
                    this.cuerpo.setSize(1250, 1250, 600, 500);
                    break;
                default:
                    break;
            }
            //console.log(this.tipo, this.size, tipoChatarra);
        }
        this.cuerpo.x = x;
        this.cuerpo.y = y;
    }
}
