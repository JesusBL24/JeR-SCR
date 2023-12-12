class Meteorito{
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
        //BOOSTER QUE TIENE EL METEORITO (SI ES ALEATORIO, ESTO SE PUEDE ELIMINAR) -> Lo es
        //this.booster = null;
    }

    //FUNCIÓN DE ACTUALIZACIÓN DEL METEORITO
    Update(escena){
        this.Movimiento(escena);
        if(this.vida <= 0){
            if(this.tieneBooster){
                this.SpawnBooster();
                this.tieneBooster = false;
            }
            this.cuerpo.destroy();
        }
    }

    //FUNCIÓN DE MOVIMIENTO DEL METEORITO
    Movimiento(escena){
        this.cuerpo.setAngle(this.cuerpo.angle + this.velocidadDeRotacion * this.direccionDeRotacion);
        //console.log(this.cuerpo.angle, this.velocidadDeRotacion)
    }

    //FUNCIÓN QUE HACE APARECER UN BOOSTER
    SpawnBooster(){
        console.log("Booster pa ti")
    }

    //FUNCIÓN LLAMADA CUANDO ES GOLPEADO;
    Hit(){
        Phaser.Actions.SetTint([this.cuerpo], this.filter);
        setTimeout(() =>{
            this.cuerpo.clearTint();
        }, 150);
    }

    //FUNCIÓN QUE HACE APARECER METEORITOS
    SpawnMeteorito(escena){
        //console.log(game.loop.actualFps);
        //SELECCIÓN ENTRE METEORITO O CHATARRA
        this.tipo = Math.floor(Math.random() * 2);
        this.direccionDeRotacion = Math.random() - 0.5;

        //SI ES METEORITO
        if(this.tipo == 0){
            this.filter = 0x00ff0000;
            this.size = Math.floor(Math.random() * 3)
            this.tieneBooster = Math.random() >= 0.33 ;
            this.cuerpo = escena.physics.add.sprite(400, 400, 'meteorite', this.size);
            this.cuerpo.setScale(1/16);

            this.vidaTotal = (3-this.size) * 20;
            this.vida = this.vidaTotal;

            switch(this.size){
                case 0:
                    this.cuerpo.setSize(950, 950);
                    break;
                case 1:
                    this.cuerpo.setSize(700, 700, 110, 100);
                    break;
                case 2:
                    this.cuerpo.setSize(450, 450, 250, 250);
                    break;
                default:
                    break;
            }
        }

        //SI ES CHATARRA
        else{
            var tipoChatarra = 1 + Math.floor(Math.random() * 5);
            
            this.filter = 0x00666666;
            this.tieneBooster = false;
            this.cuerpo = escena.physics.add.sprite(400, 400, 'trash' + tipoChatarra);
            this.cuerpo.setScale(1/16);

            this.vidaTotal = (1 + Math.floor(Math.random() * 3)) * 200;
            this.vida = this.vidaTotal;

            switch(tipoChatarra){
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
                    this.cuerpo.setSize(1500, 1500);
                    break;
                default:
                    break;
            }
            //console.log(this.tipo, this.size, tipoChatarra);
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