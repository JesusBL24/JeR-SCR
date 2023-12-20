class MenuResultados2 extends Phaser.Scene{
    constructor(props) {
        super({key:'MenuResultados2'});
        this.botonVolver = new BotonVolver(this);
    }

    preload(){
        //cargamos imagenes
        this.load.image('fondoResultados','Assets/Sprites/Menus/MenuResultados.png');
        this.load.image('decorLienzo','Assets/Sprites/Menus/DecorLienzo.png');
        this.botonVolver.preload();
    }

    create(){

        //FADE IN
        this.cameras.main.fadeIn(2000);

        /////////
        //FONDO//
        /////////

        this.add.image(0,0,'fondoResultados').setScale(0.6, 0.58).setOrigin(0,0);
        this.add.image(0,0,'decorLienzo').setOrigin(0,0);


        /////////////////////////////////////////
        //TEXTOS CON NUESTRA FUENTE TIPOGRAFICA//
        /////////////////////////////////////////

        //clasificatoria
        var escena = this;
        puntuacionGET();
        function printClasificacion(clasificacion){
            escena.add.text(425, 225, '1. ' + clasificacion[0].id + ' ' + clasificacion[0].puntuacion, {fontFamily: 'Minecraft', fontSize: "40px"});
            escena.add.text(425, 325, '2. ' + clasificacion[1].id + ' ' + clasificacion[1].puntuacion, {fontFamily: 'Minecraft', fontSize: "40px"});
            escena.add.text(425, 425, '3. ' + clasificacion[2].id + ' ' + clasificacion[2].puntuacion, {fontFamily: 'Minecraft', fontSize: "40px"});
            escena.add.text(425, 525, '4. ' + clasificacion[3].id + ' ' + clasificacion[3].puntuacion, {fontFamily: 'Minecraft', fontSize: "40px"});
            escena.add.text(425, 625, '5. ' + clasificacion[4].id + ' ' + clasificacion[4].puntuacion, {fontFamily: 'Minecraft', fontSize: "40px"});
        }
        function printClasificacionSinConexion(){
            escena.add.text(350, 225, "No se pudieron cargar las puntuaciones", {fontFamily: 'Minecraft', fontSize: "40px"});
        }

        function puntuacionGET(){
            //console.log("Hola");
            //Petición Ajax
            $.ajax({
                type: "GET",
                url: 'http://' + ip + '/puntuaciones',
                success: function(loadPuntuaciones)
                {
                    console.log(loadPuntuaciones);
                    for (var i = 0; i < loadPuntuaciones.length; i++) {
                        showPuntuacion(loadPuntuaciones[i]);
                    }
                    printClasificacion(loadPuntuaciones);
                },
                error:function(error){
                    printClasificacionSinConexion();
                    console.log(error.responseText);
                }
            });
        }

        //mi puntuacion
        this.add.text(50, 625, 'Puntuación: ' + puntuacion, {fontFamily: 'Minecraft', fontSize: "35px"});

        /////////
        //BOTON//
        /////////

        this.botonVolver.create();
    }

}