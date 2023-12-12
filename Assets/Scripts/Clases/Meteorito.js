class Meteorito{
    constructor() {
        //SPRITE DEL METEORITO (GAMEOBJECT)
        this.cuerpo = null;

        //VIDA DEL METEORITO
        this.vida;

        //VELOCIDAD MÁXIMA DEL METEORITO
        this.velocidadMaxima = 100;
        //VELOCIDAD Y DIRECCIÓN DE ROTACIÓN DEL METEORITO
        this.velocidadDeRotacion = 0.1;
        this.direccionDeRotacion;

        //TAMAÑO DEL METEORITO
        this.size;
        //TIPO (0 - METEORITO | 1 - CHATARRA)
        this.tipo;

        //SI EL METEORITO TIENE UN BOOSTER
        this.tieneBooster = false;
        //BOOSTER QUE TIENE EL METEORITO (SI ES ALEATORIO, ESTO SE PUEDE ELIMINAR) -> Lo es
        //this.booster = null;
    }

    //FUNCIÓN DE ACTUALIZACIÓN DEL METEORITO
    Update(escena){
        this.Movimiento(escena);
        if(this.vida <= 0 && this.tieneBooster){
            this.SpawnBooster();
        }
    }

    //FUNCIÓN DE MOVIMIENTO DEL METEORITO
    Movimiento(escena){
        //this.cuerpo.x += Math.cos(this.cuerpo.rotation) * this.velocidadMaxima * 0.02;
        //this.cuerpo.y += Math.sin(this.cuerpo.rotation) * this.velocidadMaxima * 0.02;
        this.cuerpo.setAngle(this.cuerpo.angle + this.velocidadDeRotacion * this.direccionDeRotacion);
    }

    //FUNCIÓN QUE HACE APARECER UN BOOSTER
    SpawnBooster(){
        console.log("Booster pa ti")
    }

    //FUNCIÓN QUE HACE APARECER METEORITOS
    SpawnMeteorito(escena){

        //SELECCIÓN ENTRE METEORITO O CHATARRA
        this.tipo = Math.floor(Math.random() * 2);
        this.direccionDeRotacion = Math.random() - 0.5;

        //SI ES METEORITO
        if(this.tipo == 0){
            this.size = Math.floor(Math.random() * 3)
            this.tieneBooster = Math.random() >= 0.33 ;
            this.cuerpo = escena.physics.add.sprite(400, 400, 'meteorite', this.size);
            this.cuerpo.setScale(1/16);
            this.vida = (1+this.size) * 20;

            switch(this.size){
                case 0:
                    this.cuerpo.setCircle(512);
                    break;
                case 1:
                    this.cuerpo.setCircle(400, 110, 100);
                    break;
                case 2:
                    this.cuerpo.setCircle(256, 250, 250);
                    break;
                default:
                    break;
            }
        }

        //SI ES CHATARRA
        else{
            var tipoChatarra = 1 + Math.floor(Math.random() * 5);
            this.tieneBooster = false;
            this.cuerpo = escena.physics.add.sprite(400, 400, 'trash' + tipoChatarra);
            this.cuerpo.setScale(1/16);
            this.vida = (1 + Math.floor(Math.random() * 3)) * 20;

            switch(tipoChatarra){
                case 1:
                    this.cuerpo.setSize(500, 500);
                    break;
                case 2:
                    this.cuerpo.setSize(500, 500);
                    break;
                case 3:
                    this.cuerpo.setCircle(400, 250, 250);
                    break;
                case 4:
                    this.cuerpo.setCircle(500, 20, 20);
                    break;
                case 5:
                    this.cuerpo.setSize(1500, 1500);
                    break;
                default:
                    break;
            }
            console.log(this.tipo, this.size, tipoChatarra);
        }

    }
}

//////////////////////////////////////////////////////////
//PARA EL PRELOAD DE LA ESCENA PRINCIPAL:
//////////////////////////////////////////////////////////
//
// this.load.spritesheet("meteorite", "Assets/Sprites/Asteroides/AsteroidsSCR.png", {
//     frameWidth: 1024,
//     frameHeight: 1024,
//     startFrame: 0,
//     endFrame: 3,
//   });
//   this.load.image("trash1", "Assets/Sprites/Restos/Restos1.png");
//   this.load.image("trash2", "Assets/Sprites/Restos/Restos2.png");
//   this.load.image("trash3", "Assets/Sprites/Restos/Restos3.png");
//   this.load.image("trash4", "Assets/Sprites/Restos/Restos4.png");
//   this.load.image("trash5", "Assets/Sprites/Restos/RestoGrande.png");