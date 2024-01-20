class MapaOnline {
  constructor() {
    //NÚMERO DE METEORITOS A CREAR EN EL MAPA
    this.numeroDeMeteoritos = 50;

    //METEORITOS EN EL MAPA
    this.meteoritos = null;

    //CUERPO DE LOS METEORITOS EN EL MAPA
    this.cuerposMeteoritos = [];

    //TAMAÑO DEL MAPA
    this.diametro = 1000;

    //LIMITE DEL MAPA
    this.limite = null;

    //OBJETOS EN EL LIMITE DEL MAPA PARA QUE EL JUGADOR NO PUEDA SALIR
    this.CollidersLimite = null;

    //ESTILO DE GRÁFICOS (DE MOMENTO PARA PINTAR EL LIMITE)
    this.graficos = null;
  }

  //FUNCION QUE GENERA EL LIMITE DEL MAPA
  GenerarLimite(escena) {
    //GENERA EL CISCULO QUE HACE DE LIMITE DEL MAPA
    this.limite = new Phaser.Geom.Circle(0, 0, this.diametro);

    //DEFINE COMO SE PINTARA EL CIRCULO QUE LIMITA EL MAPA
    this.graficos = escena.add.graphics({
      lineStyle: { width: 2, color: 0xff0000 },
      fillStyle: { color: 0x00ff00 },
    });

    //GENERA LOS OBJETOS QUE IMPEDIRAN AL JUGADOR SALIR DEL MAPA (DE MOMENTO SE USA UN SPRITE DE BOMBA)
    //(EL NUMERO DE ELEMENTOS Y SU TAMAÑO TENDRA QUE IR EN FUNCIÓN DEL TAMAÑO DEL CIRCULO)
    this.CollidersLimite = escena.physics.add.staticGroup({
      key: "bomb",
      frameQuantity: 180,
    });

    //ASIGNA UN COLLIDER CIRCULAR A CADA OBJETO DENTRO DE COLLIDERS LIMITE
    for (const collider of this.CollidersLimite.getChildren()) {
      collider.setCircle(8);
    }

    //COLOCA LOS COLLIDERS EN EL LIMITE
    Phaser.Actions.PlaceOnCircle(
      this.CollidersLimite.getChildren(),
      this.limite
    );

    //REFRESCA COLLIDERS LIMITE DESPUÉS DE ALTERAR SU POSICIÓN
    this.CollidersLimite.refresh();
  }

  //FUNCIÓN PARA GENERAR EL MAPA (TODO)
  GenerarMapa(escena) {

    //GENERAMOS EL LIMITE DE LA ESCENA
    this.GenerarLimite(escena);

    //GENERAMOS LOS METEORITOS
    this.meteoritos = new Array(this.numeroDeMeteoritos);
    var meteoritosJSON = [
        {"x":512.7221893198857,"y":-506.00338223210895,"tipo":0,"size":1,"direccionDeRotacion":-0.4738600088768421},{"x":-136.5343889220513,"y":704.2443830806196,"tipo":1,"size":4,"direccionDeRotacion":-0.1962382943663854},{"x":472.37154525316754,"y":578.4900882001737,"tipo":1,"size":5,"direccionDeRotacion":0.11379402730394639},{"x":-90.72535474305992,"y":709.5363219017942,"tipo":1,"size":3,"direccionDeRotacion":-0.0071576021434858195},{"x":-689.957901220112,"y":191.49822948912313,"tipo":0,"size":0,"direccionDeRotacion":0.39225837852772694},{"x":103.27263452252815,"y":-417.00982274117536,"tipo":1,"size":2,"direccionDeRotacion":0.17061221186802977},{"x":-116.45212103905223,"y":-88.15726364105187,"tipo":0,"size":0,"direccionDeRotacion":0.35898443063316066},{"x":-148.28760169043576,"y":509.8091204553566,"tipo":1,"size":5,"direccionDeRotacion":-0.22528560779777762},{"x":515.3777111260603,"y":185.4005280808623,"tipo":0,"size":2,"direccionDeRotacion":0.4484533037714584},{"x":52.33880085358986,"y":-427.712746972264,"tipo":0,"size":0,"direccionDeRotacion":0.3357070545083991},{"x":-533.7318387523358,"y":-473.04112143598155,"tipo":0,"size":1,"direccionDeRotacion":0.15203883948067332},{"x":-595.106382976972,"y":529.7369466356661,"tipo":0,"size":1,"direccionDeRotacion":0.3010182472135534},{"x":-139.51356205536732,"y":-743.0529272348105,"tipo":1,"size":4,"direccionDeRotacion":0.45206571717642596},{"x":625.2722538818633,"y":336.80555982386926,"tipo":1,"size":5,"direccionDeRotacion":0.4906464382952904},{"x":-235.736101915142,"y":-47.73656131383123,"tipo":1,"size":2,"direccionDeRotacion":-0.1608186881675011},{"x":-543.829202797764,"y":-87.24329079200585,"tipo":0,"size":2,"direccionDeRotacion":-0.11627851113189647},{"x":639.151693272139,"y":-359.361820675539,"tipo":0,"size":2,"direccionDeRotacion":-0.47320605417467587},{"x":102.4030125269086,"y":-338.0365823789018,"tipo":1,"size":4,"direccionDeRotacion":0.31373132998531084},{"x":43.26941060496353,"y":717.9446391940837,"tipo":0,"size":1,"direccionDeRotacion":-0.39272835403267337},{"x":-151.11081125089405,"y":-190.2638780845799,"tipo":0,"size":1,"direccionDeRotacion":0.23519540528518013},{"x":-333.85402989068626,"y":11.005857271954895,"tipo":0,"size":2,"direccionDeRotacion":0.37158481694171797},{"x":-343.83274979129374,"y":641.4860157531239,"tipo":1,"size":1,"direccionDeRotacion":-0.22768825490625777},{"x":-656.9632778639226,"y":76.12902032277981,"tipo":0,"size":1,"direccionDeRotacion":0.3736884865479533},{"x":363.55431899091934,"y":350.4711686240316,"tipo":0,"size":2,"direccionDeRotacion":-0.3421563932902678},{"x":613.656842632172,"y":60.58535050759591,"tipo":1,"size":1,"direccionDeRotacion":-0.10449060644692731},{"x":547.5224130566769,"y":-376.741109287596,"tipo":1,"size":2,"direccionDeRotacion":0.0771010357771087},{"x":-41.29147168757331,"y":-656.6351824038363,"tipo":0,"size":0,"direccionDeRotacion":0.23292433044480565},{"x":554.4293114463935,"y":-245.80667329132342,"tipo":1,"size":5,"direccionDeRotacion":-0.2953916338729521},{"x":325.853844125788,"y":39.17117886007866,"tipo":1,"size":2,"direccionDeRotacion":0.13647132910639903},{"x":-334.52516402220954,"y":475.2991778144734,"tipo":0,"size":0,"direccionDeRotacion":0.02565478740657645},{"x":-35.30978307040769,"y":-159.86656662228594,"tipo":1,"size":3,"direccionDeRotacion":0.294366563255515},{"x":-139.30331732981256,"y":88.4486234530362,"tipo":1,"size":2,"direccionDeRotacion":0.08525925820858982},{"x":101.60540766596611,"y":27.383218313836394,"tipo":0,"size":1,"direccionDeRotacion":-0.33100671770808066},{"x":-186.83184709472982,"y":338.2779115075981,"tipo":0,"size":0,"direccionDeRotacion":-0.1636420759802999},{"x":-222.64014044779006,"y":-555.6676479469174,"tipo":0,"size":0,"direccionDeRotacion":0.1758216617474131},{"x":112.86507539023751,"y":766.5662371008112,"tipo":0,"size":2,"direccionDeRotacion":-0.3846439457243056},{"x":-77.73580810417128,"y":664.6660246805699,"tipo":1,"size":2,"direccionDeRotacion":-0.3739617505488857},{"x":583.7730212065441,"y":-355.07725282817796,"tipo":0,"size":0,"direccionDeRotacion":-0.47683470064605404},{"x":-530.577397137224,"y":-116.36283177649669,"tipo":0,"size":1,"direccionDeRotacion":-0.3516668544589616},{"x":-676.1493945844109,"y":79.24382329997353,"tipo":1,"size":5,"direccionDeRotacion":0.24028906763629676},{"x":-52.31539025036614,"y":48.23762618734687,"tipo":0,"size":2,"direccionDeRotacion":0.1522488310485135},{"x":728.0283906727495,"y":-284.2724540157384,"tipo":1,"size":5,"direccionDeRotacion":0.17796814567547803},{"x":42.507451295394446,"y":-76.48360974429865,"tipo":1,"size":5,"direccionDeRotacion":0.4384487296856161},{"x":-202.93359168268088,"y":117.03528608923676,"tipo":1,"size":1,"direccionDeRotacion":-0.3519084664686818},{"x":315.83311867188576,"y":-143.69003771667067,"tipo":0,"size":0,"direccionDeRotacion":-0.2971369003467441},{"x":-50.74213501849143,"y":656.5614401207542,"tipo":1,"size":5,"direccionDeRotacion":-0.2054497040517207},{"x":-647.2963035447218,"y":-167.95146744912668,"tipo":1,"size":1,"direccionDeRotacion":-0.38362491779084085},{"x":561.0539807788515,"y":381.0812412764404,"tipo":1,"size":2,"direccionDeRotacion":-0.49002186441735773},{"x":-112.30641495820363,"y":-649.2444307407179,"tipo":0,"size":1,"direccionDeRotacion":0.1545706544065899},{"x":-236.29348650091302,"y":105.7811076189878,"tipo":1,"size":2,"direccionDeRotacion":-0.16159620479993375}
    ]

    //GENERAMOS CADA METEORITO
    for(var i = 0; i < this.numeroDeMeteoritos; i++){
      this.meteoritos[i] = new MeteoritoOnline();
      this.meteoritos[i].SpawnMeteoritoOnline(escena, meteoritosJSON[i].size, meteoritosJSON[i].tipo,
          meteoritosJSON[i].x, meteoritosJSON[i].y, meteoritosJSON[i].direccionDeRotacion);

      //AÑADIMOS EL CUERPO DE LOS METEORITOS AL ARRAY AUXILIAR
      this.cuerposMeteoritos[i] = this.meteoritos[i].cuerpo;
    }

    //COLOCAMOS LOS METEORITOS EN EL MAPA
    var limiteMeteoritos = new Phaser.Geom.Circle(0, 0, this.diametro * 0.8);
    //Phaser.Actions.RandomCircle(this.cuerposMeteoritos, limiteMeteoritos);
  }

  //FUNCIÓN DE ACTUALIZACIÓN DEL MAPA
  Update(escena, jugador1, jugador2) {
    //PINTA EL LIMITE
    this.graficos.clear();
    this.graficos.strokeCircleShape(this.limite);

    //COMPRUEBA LAS COLISIONES CON EL LIMITE DEL MAPA
    escena.physics.world.collide(jugador1.cuerpo, this.CollidersLimite);
    escena.physics.world.collide(jugador2.cuerpo, this.CollidersLimite);
    escena.physics.world.collide(this.cuerposMeteoritos, this.CollidersLimite);
  }

}
