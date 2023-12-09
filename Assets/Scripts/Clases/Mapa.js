class Mapa{
    constructor() {
        //NÚMERO DE METEORITOS A CREAR EN EL MAPA
        this.numeroDeMeteoritos;

        //METEORITOS EN EL MAPA
        this.meteoritos;

        //TAMAÑO DEL MAPA
        this.tamañoX;
        this.tamañoY;

        //LIMITE DEL MAPA
        this.limite;

        //OBJETOS EN EL LIMITE DEL MAPA PARA QUE EL JUGADOR NO PUEDA SALIR
        this.CollidersLimite;

        //ESTILO DE GRÁFICOS (DE MOMENTO PARA PINTAR EL LIMITE)
        this.graficos;

    }

    //FUNCION QUE GENERA EL LIMITE DEL MAPA
    GenerarLimite(escena){

        //GENERA EL CISCULO QUE HACE DE LIMITE DEL MAPA
        this.limite = new Phaser.Geom.Circle(400, 300, 250);

        //DEFINE COMO SE PINTARA EL CIRCULO QUE LIMITA EL MAPA
        this.graficos = escena.add.graphics({ lineStyle: { width: 2, color: 0xFF0000 }, fillStyle: { color: 0x00FF00 }});

        //GENERA LOS OBJETOS QUE IMPEDIRAN AL JUGADOR SALIR DEL MAPA (DE MOMENTO SE USA UN SPRITE DE BOMBA)
        //(EL NUMERO DE ELEMENTOS Y SU TAMAÑO TENDRA QUE IR EN FUNCIÓN DEL TAMAÑO DEL CIRCULO)
        this.CollidersLimite = escena.physics.add.staticGroup({
            key: 'bomb',
            frameQuantity: 60
        });

        //ASIGNA UN COLLIDER CIRCULAR A CADA OBJETO DENTRO DE COLLIDERS LIMITE
        for (const collider of this.CollidersLimite.getChildren())
        {
            collider.setCircle(8);
        }

        //COLOCA LOS COLLIDERS EN EL LIMITE
        Phaser.Actions.PlaceOnCircle(this.CollidersLimite.getChildren(), this.limite);

        //REFRESCA COLLIDERS LIMITE DESPUÉS DE ALTERAR SU POSICIÓN
        this.CollidersLimite.refresh();
    }

    //FUNCIÓN PARA GENERAR EL MAPA (TODO)
    GenerarMapa(escena){
        this.GenerarLimite(escena);
    }

    //FUNCIÓN DE ACTUALIZACIÓN DEL MAPA
    Update(escena, jugador1, jugador2){

        //PINTA EL LIMITE
        this.graficos.clear();
        this.graficos.strokeCircleShape(this.limite);

        //COMPRUEBA LAS COLISIONES CON EL LIMITE DEL MAPA (AQUI HHABRA QUE AÑADIR LOS METEORITOS)
        escena.physics.world.collide(jugador1.cuerpo, this.CollidersLimite);
        escena.physics.world.collide(jugador2.cuerpo, this.CollidersLimite);

    }
}