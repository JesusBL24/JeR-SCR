<p align="center">
 <img width=1000 heigth=1000 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/SCRLogoNegro.png"> <br>
</p>

<p align="center">
 <img width=150 heigth=150 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/WildClawLogo2.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/WildClawLogo2.png">Figura 1: logo de la empresa</a>
</p>

"Space Combat Rush" es un juego multijugador creado en 2023 por la empresa [Wild Claw Studio](https://www.youtube.com/@WildClawGS) (Figura 1: logo de la empresa); creadora de otros juegos como [Mr Erazer's Revenge](https://lordorco.itch.io/mr-erazers-revenge) y [The Inner Doors](https://tasiatas.itch.io/the-inner-doors). 

En este juego (Figura 2: InGame SCR), dos o más jugadores se enfrentarán en batallas de naves espaciales en un campo de asteroides. Cada jugador controlará una nave y su misión será acabar con el resto de jugadores; mientras navega evitando los asteroides y destruyéndolos para conseguir mejoras para su nave.

<p align="center">
 <img width=600 heigth=300 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Pantalla%20Principal.JPG"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Pantalla%20Principal.JPG">Figura 2: InGame SCR</a>
</p>


# Integrantes del equipo
---

 -  Jesús Bastante López - Correo URJC: j.bastante.2021@alumnos.urjc.es - GitHub: [JesusBL24](https://github.com/JesusBL24)
 -  José Antonio González Mesado - Correo URJC: ja.gonzalezme.2021@alumnos.urjc.es - GitHub: [jagonmes](https://github.com/jagonmes)
 -  Anastasia Ihnatsenka Shakhova - Correo URJC: a.ihnatsenka.2021@alumnos.urjc.es - GitHub: [TasiaTas](https://github.com/TasiaTas)
 -  Lorena Martínez González - Correo URJC: l.martinezg.2021@alumnos.urjc.es - GitHub: [LorenaMartinez2704](https://github.com/LorenaMartinez2704)
 -  Jorge Juan Xuclá Esparza - Correo URJC: jj.xucla.2021@alumnos.urjc.es - GitHub: [LordOrco](https://github.com/LordOrco)

# GDD
---


## Concepto del juego

“Space Combat Rush es un juego multijugador con vista cenital en el que dos o más jugadores se enfrentarán en batallas de naves espaciales en un campo de asteroides. Cada jugador controlará una nave y su misión será acabar con el resto de jugadores; mientras navega evitando los asteroides y destruyéndolos para conseguir mejoras para su nave.

## Clasificación

Antes de comenzar a desarrollar cómo se verá y funcionará nuestro videojuego, lo clasificaremos en función de distintos aspectos:

En primer lugar, la plataforma donde se jugará va a ser en principio únicamente el ordenador.

Luego, en cuanto al modelo de negocio y, por tanto, la forma de monetizar nuestro juego, se trataría de un Free to Play, por lo que se podrá jugar de forma gratuita sin ningún tipo de limitación. Aunque, una vez publicado el juego, estaría la opción de añadir más adelante micropagos.

Por otro lado, este juego será publicado en Europa. Por lo que utilizaremos la clasificación por edad europea: PEGI; que en nuestro caso será PEGI 7 (personas mayores de 7 años), poniendo esta restricción al tratarse de un juego de lucha. Y, respecto a la audiencia, este juego estará dirigido especialmente a los usuarios habituales de juegos de lucha y/o matamarcianos, a los que suelen jugar en el ordenador y a aquellos a los que les guste jugar en compañía.

En cuanto al género y temática del videojuego, se tratará de un videojuego de lucha y, en lo respectivo a la temática y el estilo artístico del juego, será  un juego de naves con estilo pixel art.

Finalmente, la forma de interactuar con este juego será a través de teclado.

## Gameplay e historia

### Historia:

Con el avance de la tecnología y las ingeniería espacial, la humanidad ha conseguido extenderse a través del cosmos. La población humana crece exponencialmente, los recursos obtenidos de las colonias son casi infinitos y las naves cada vez más extravagantes y potentes. En este contexto nació Space Combat Rush(placeholder), el deporte más letal y espectacular a escala galáctica. La gloria y la fama esperan a nuestros pilotos en un emocionante combate 1vs1 lleno de metal, plasma y mucho fuego en el que se lo juegan todo.

¿Quién caerá?

¿Quién saldrá victorioso?

Estas preguntas solo se contestan en la arena.

### Gameplay:

Cada jugador controla una nave con el objetivo de destruir la del otro jugador. Dicha nave solo podrá moverse hacia delante y girar.

El espacio de movimiento es una arena (más desarrollo en el apartado “niveles”) en la que aparecerán dos tipos de meteoritos: uno normal que hace daño al jugador si lo golpea y otro de colores que, además del efecto anterior, si el jugador le dispara, aparecerá una mejora de arma (ver mejoras de arma en apartado “objetos”) que le ayudará a acabar con su contrincante.

Cada partida es al mejor de 3 rondas (quién gane 2 rondas gana la partida) y, para terminar una ronda, un jugador debe destruir la nave del otro. Cada ronda cuenta con un minuto y medio para terminarla; si no se termina al acabar ese tiempo entramos en fase de “muerte súbita”.

## Niveles

El espacio de juego es lineal y se sitúa en el espacio. Dentro de la arena hay meteoritos y chatarra espacial que sirven como obstáculos, todos estos obstáculos moldean la arena y se crean proceduralmente en cada partida. Con esto, cada partida tendrá una arena única, lo que aporta un componente aleatorio a la partida, siendo así el videojuego más variado y divertido.

El tamaño de la arena se adecua al ritmo del juego, haciendo así que las partidas no sean demasiado largas y los jugadores no estén la mayor parte del tiempo buscándose en vez de disparándose.


## Interfaz


Comenzamos ahora a hablar sobre la interfaz, tanto la que encontramos durante la partida como la de fuera de ella.

En cuanto a la interfaz externa a la partida, en primer lugar tenemos un menú inicial compuesto de 3 opciones: “comenzar”, donde se dará comienzo al juego, “créditos”, donde se mencionará a los creadores del juego, y “controles“, donde se explicará mediante gráficos los distintos controles de cada jugador.

Y, respecto a la de dentro de la partida, tendremos una interfaz sencilla, similar a la de juegos de lucha como [Street Fighter](https://es.wikipedia.org/wiki/Street_Fighter) (Figura 3: ejemplo Street Fighter).

<p align="center">
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/SFII.webp"> <br>
 <a href="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/SFII.webp">Figura 3: ejemplo Street Fighter</a>
</p>

Nuestro juego está compuesto únicamente de:

-   **Barra de vida**: se indicará de esta forma la vida de cada jugador presente en la arena de combate.

-   **Cuenta atrás**: contendrá además una cuenta atrás para informar del tiempo que queda de combate.

-   **Círculos de boosters**: se representará mediante círculos pequeños en la parte inferior de la pantalla los distintos boosters (refuerzos tales como + velocidad) que consiga cada jugador.

La navegación por el juego será la siguiente (Figura 4: flujograma SCR):

<p align="center">
 <img width=1000 heigth=1000 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Flujograma%20General.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Flujograma%20General.png">Figura 4: flujograma SCR</a>
</p>

## Items

Acerca de los items que formarán parte del juego, tendremos una serie de boosters que los jugadores podrán recoger para potenciar su nave durante cada partida. Habrá 4 clases de boosters distintos de los cuales, a su vez, podremos encontrar varios subtipos. Además, habrá un booster especial que aparecerá una vez al final de cada partida, en la fase de “Muerte súbita”. Los boosters serán los siguientes:

-   **Mejoras de arma:**
    -   Mejoras de tipo de disparo: en vez de 1 disparo, tener dos disparos paralelos, o en ráfaga.
    -   Mejora de tipo de arma: en vez del arma básica, un lanzamisiles o un rifle semiautomático.
    -   Mejora de compañero: el jugador tendrá un dron a su alrededor que disparará cada cierto tiempo.

-   **Mejoras de movilidad:**
    -   Mejora de velocidad.

-   **Escudo:** protege al jugador que lo recoge de una cantidad de daño.

-   **Mejora final:** la nave del jugador que consiga recoger este booster apuntará automáticamente a la nave enemiga (pero los proyectiles no serán teledirigidos).

## Personajes

Nuestro juego no contará con más personajes que aquellos que controlen los jugadores; por lo que serán 2 en total.

Aunque en un futuro se podrá plantear extender el número de diseños de los aviones para que los jugadores puedan seleccionar el que quieran, de momento, los jugadores estarán representados únicamente por un avión de diseño fijo cada uno.

Este diseño implica que sean aviones futuristas de caza que permitan el vuelo espacial en estética pixel art (se describirá más adelante).

## Música

El juego contará con un tema que sonará mientras el jugador está en el menú principal y, en general, mientras no está en partida. Y una canción más que se escuchará durante la partida y que se verá intensificada una vez empiece la muerte súbita.

Además, tendrá una serie de efectos de sonido para las diversas acciones:

-   Pulsar botones para navegar por los menús.
-   Una vez dentro de la partida:
    -   Mover la nave.
    -   Chocar con asteroides.
    -   Disparar.
    -   Acertar un disparo a un asteroide o al rival.
    -   Recibir un disparo.
    -   Conseguir un booster.

## Estética y concepts

Tal como se ha ido mencionando durante el documento, este juego seguirá la estética pixel art similar a otros juegos como Gradius o Asteoids. Con una paleta de color más oscura y algunos pocos colores más llamativos para crear contraste (Figura 5: paleta de colores). Generalmente buscaremos transmitir una sensación de mayor seriedad. La paleta a seguir de guía será la siguiente:

<p align="center">
 <img width=600 heigth=1000 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Paleta.PNG"> <br>
 <a href="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Paleta.PNG">Figura 5: paleta de colores</a>
</p>

A continuación se presentarán algunos concepts de los aviones y entornos. Estos serán tanto diseñados por nuestro equipo, como cogidos de referencia de otras fuentes.

Aunque, según avance el desarrollo del juego, se generarán todos los sprites de forma original por nuestro grupo y se incorporarán en el documento.

### Concept de aviones:

<p align="center">
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Naves%20Boceto.jpg"> <br>
 <a href="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Naves%20Boceto.jpg">Figura 6: concepts generales</a> <br> <br>
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Naves.jpg"> <br>
 <a href="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Naves.jpg">Figura 7: diseño naves final</a> <br><br>
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/NaveReferencia1.jpg"> <br>
 <a href="https://www.deviantart.com/shoguneagle/art/McDaniels-Shipwrights-Condor-class-gunship-510541336">Figura 8: Shoguneagle's McDaniels Shipwrights Condor-class gunship</a> <br><br>
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/NaveReferencia2.jpg"> <br>
 <a href="https://www.deviantart.com/euderion/art/Turian-Shuttles-768172079">Figura 9: Euderian's Turian Shuttles</a> <br><br>
</p>


### Referencias para entornos:

<p align="center">
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/neonSunset.jpg"> <br>
 <a href="https://www.deviantart.com/goatmutation/art/Neon-Sunset-on-an-alien-planet-829231654">Figura 10: GoatMutation's Neon Sunset</a> <br> <br>
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/spaceTravel.jpg"> <br>
 <a href="https://www.deviantart.com/qauz/art/Space-Travel-575566386">Figura 11: QAuZ's Space Travel</a> <br> <br>
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Gradius-II-1-Fire-Dragons-1.jpg"> <br>
 <a href="https://es.wikipedia.org/wiki/Gradius_II">Figura 12: fondo Gradius II</a> <br> <br>
</p>


## Basado en

Para crear este juego hemos partido principalmente de dos fuentes de inspiración.

El juego [Asteroids](https://en.wikipedia.org/wiki/Asteroids_%28video_game%29) (Figura 13: referencia Asteroids) de Atari de 1979, del que tomamos prestado tanto la localización y la perspectiva como el control general de las naves.

<p align="center">
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Asteroids.PNG"> <br>
 <a href="https://en.wikipedia.org/wiki/Asteroids_%28video_game%29">Figura 13: referencia Asteroids</a>
</p>

Y la saga de juegos de Konami [Gradius](https://es.wikipedia.org/wiki/Gradius) (Figura 14: referencia Gradius). En los que nos hemos fijado para diseñar las distintas mejoras que podemos conseguir para nuestra nave (vida/escudos, velocidad o distintas armas) al destruir algunos de los asteroides.

<p align="center">
 <img width=600 heigth=300 src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Gradius.jpg"> <br>
 <a href="https://es.wikipedia.org/wiki/Gradius">Figura 14: referencia Gradiuss</a>
</p>


# FASE 2 (ACTUALIZACIÓN)
---

A continuación detallaremos todos los cambios y adiciones que se han realizado sobre el juego durante su desarrollo en esta segunda fase. 

## Flujograma y pantallas

El juego SCR contiene 6 pantallas por las que puede navegar el jugador. Cinco de ellas son más informativas para ayudar al jugador a comprender el juego y una de ellas el el juego en sí. La navegación a través de ellas se puede observar a base de la siguiente imagen (Figura 15: flujograma SCR):

<p align="center">
 <img width=1000 heigth=1000 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Flujograma-Pantallas.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Flujograma-Pantallas.png">Figura 15: flujograma SCR</a>
</p>

**Menú de inicio:** en esta pantalla (Figura 16: menú inicial) se presenta la entrada al juego y se dan 3 opciones al jugador: el acceso al propio juego, el acceso al menú de créditos y el acceso a los controles del juego.

<p align="center">
 <img width=600 heigth=600 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Menu%20Principal.JPG"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Menu%20Principal.JPG">Figura 16: menú inicial</a>
</p>

**Menú de créditos:** esta pantalla (Figura 17: menú de créditos) permite al jugador conocer a los creadores de este juego. Y, una vez esté satisfecho, podrá darle al botón de "volver" y accederá al menú de inicio.

<p align="center">
 <img width=600 heigth=600 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Creditos.JPG"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Creditos.JPG">Figura 17: menú de créditos</a>
</p>

**Menú de controles:** esta pantalla (Figura 18: menú de controles) permite al jugador conocer las teclas que deben utilizar cada uno de ellos dentro del juego. Este menú tiene un botón de volver para acceder al menú inicial.

<p align="center">
 <img width=600 heigth=600 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Controles.JPG"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Controles.JPG">Figura 18: menú de controles</a>
</p>

**Menú de boosters:** esta pantalla (Figura 19: menú de boosters) permite al jugador conocer cada una de las mejoras que puede obtener para su nave dentro del juego y los efectos que estos tendrán. Este menú tiene un botón de volver para acceder al menú inicial.

<p align="center">
 <img width=600 heigth=600 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Boosters.JPG"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Boosters.JPG">Figura 19: menú de boosters</a>
</p>

**Pantalla InGame:** esta pantalla (Figura 20: pantalla InGame) es la base del juego. Esta pantalla está dividida en 2 para que cada uno pueda ver su nave desde su propio punto de vista y contiene la interfaz asociada a la nave; con los recuadros que contienen los boosters que va obteniendo el jugador durante la partida y la vida que tiene en cada momento a modo de una barra. Una vez finaliza la partida (cuando muere uno de los jugadores), se vuelve automáticamente (tras mostrar los mensajes de "Has ganado" o "Has perdido") al menú inicial.

<p align="center">
 <img width=600 heigth=600 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Pantalla%20Principal.JPG"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Capturas%20de%20Pantalla/Pantalla%20Principal.JPG">Figura 20: pantalla InGame</a>
</p>

## Apartado técnico

En el juego, además de implementar las distintas pantallas/menús, pasamos a describir más a fondo otros aspectos técnicos implementados en el juego.

En primera instancia, se han incorporado a los personajes que son dos naves (uno asociado a cada jugador). Estos se mueven con las teclas WAD o 846 (numpad) para poder moverlos. W y 8 permiten acelerar la nave y, las otras, rotarla.

Luego, las teclas SPACE y 0 (numpad) sirven para disparar los distintos proyectiles. Estos proyectiles tienen una velocidad constante y son destruidos tras 5 segundos de haber disparado (si no han chocado con algún elemento del juego).

Dentro de los elementos en el espacio de juego (delimitado por un círculo de sprites que simula la arena de lucha) podemos encontrar meteoritos y chatarra espacial. Todos ellos tienen colliders que permiten la interacción de las naves con estos. En otras palabras, si la nave se choca con ellos, estos cogen velocidad y se mueven simulando el movimiento de objetos en el espacio. Además, en el caso de los meteoritos, estos se pueden romper disparándolos (se vuelven rojos para mostrar el daño realizado) y, estos, te proporcionan diferentes boosters/mejoras.

En esta segunda fase se han implementado 5 boosters distintos con funcionalidades particularidades:

  -**Ametralladora:** da mayor cadencia de disparo con 20 disparos disponibles. 
  
  -**Dobleyectil:** dispara proyectiles en paralelo con 10 disparos disponibles.
  
  -**Escudo:** proporciona vida adicional.
  
  -**Lanzamisiles:** dispara proyectiles explosivos con 5 disparos.
  
  -**Velocidad:** mayor velocidad de rotación en los giros.

Por añadido, en la interfaz del juego, se han incorporado dos elementos que dan feedback al usuario respecto al estado de su nave. Estas son la barra de vida y las cajas que contendrán los boosters que recogen los jugadores al destruir los meteoritos.

Para finalizar el juego, cuando muere un jugador, sale por encima del escenaro en la pantalla respectiva de cada jugador un mensaje de "Has ganado" o "Has perdido". Estas se mantienen unos segundos y procede a realizarse un fade a negro para volver al menú inicial; donde los jugadores podrán volver a navegar por las distintas pantallas o iniciar una partida nueva.

## Apartado artístico

Finalmente, en esta segunda actualización, presentaremos todas las creaciones artísticas para que el juego sea visual y atractivo para el jugador.

Primero y ante todo, las naves. Se han creado 3 diseños de naves aunque, al final, se han implementado solo 2 de ellas. Para futuros desarrollos se baraja la opción de poder seleccionar la skin deseada de la nave para jugar con ella y, por ello, ya se fue diseñando alguna nave extra. Los tres diseños (Figura 21: naves finales) ya existentes son los siguientes:

<p align="center">
 <img width=600 heigth=600 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Naves.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Naves.png">Figura 21: naves finales</a>
</p>

También se han diseñado todos los boosters (Figura 22: boosters) del juego para que tengan su propio icono asociado. A nivel visual se representan a continuación en el orden de **Ametralladora**, **Dobleyectil**, **Velocidad**, **Escudo** y **Lanzamisiles**:

<p align="center">
 <img width=800 heigth=800 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/Boosters.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/Boosters.png">Figura 22: boosters</a>
</p>

Además, se ha creado todo el aspecto de chatarra espacial y meteoritos (Figura 23: chatarra espacial y meteoritos). Estos se representan en la siguiente imagen:

<p align="center">
 <img width=800 heigth=800 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/ChatarrayMeteoritos.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/ChatarrayMeteoritos.png">Figura 23: chatarra espacial y boosters</a>
</p>

Por añadido, se han creado también todos los proyectiles que se disparan y las explosiones de los elementos (Figura 24: proyectiles y explosiones). Estos son los siguientes:

<p align="center">
 <img width=700 heigth=700 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/ProyectilesyExplosiones.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/ProyectilesyExplosiones.png">Figura 24: proyectiles y explosiones</a>
</p>

Otro elemento importante que ha sido creado por nosotros es el propio escenario/fondo del juego (Figura 25: fondos). Existen 3 fondos diferentes de los que se han usado 2 en esta segunda fase (uno para los menus, el tercero, y otro para la pantalla InGame, el segundo). Estos son los siguientes:

<p align="center">
 <img width=1000 heigth=1000 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/TodosFondos.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/TodosFondos.png">Figura 25: fondos</a>
</p>

Finalmente, otro elementos (Figura 26: otros elementos) extra que han sido creados por nosotros son los recuadros para los boosters y la barra de vida de la interfaz, el logo del juego y los botones (se ejemplificará con un único botón). Estos son los siguientes:

<p align="center">
 <img width=1000 heigth=1000 src="https://github.com/jagonmes/Imagenes-JeR/blob/main/ElementosVarios.png"> <br>
 <a href="https://github.com/jagonmes/Imagenes-JeR/blob/main/ElementosVarios.png">Figura 26: otros elementos</a>
</p>

## Elementos no propios

Nuestro juego, en su mayoría, es artesanal. Los únicos elementos externos no hechos por nosotros son los sonidos implementados cogidos de Pixabay (del motor de la nave y los disparos), la tipografía pixelada usada de DaFont y los sprites que delimitan el espacio del juego para los jugadores que son del tutorial de Phaser. A nivel de código, la única parte que no es nuestra es la referente al movimiento de la nave que se cogió de un ejemplo de Phaser.

Estos se referencian en el apartado correspondiente de este documento (Referencias y Anexos).

# REFERENCIAS Y ANEXOS
---

A modo de resumen de todo el material utilizado durante este documento, se han utilizado los siguientes enlaces:
- Wikipedia, (07:09 15 nov 2023‎). _Street Fighter_. Nombre del sitio web: [https://es.wikipedia.org/wiki/Street_Fighter](https://es.wikipedia.org/wiki/Street_Fighter)
- Capcom, (1987). _Imagen Street Fighter_. Nombre del sitio web: [https://computerhoy.com/noticias/gaming/street-fighter-ii-aniversario-30-anos-806635](https://computerhoy.com/noticias/gaming/street-fighter-ii-aniversario-30-anos-806635)
- Nuestra paleta, (12 oct 2023). _Generador de paleta de color Coolor_. Nombre del sitio web: [https://coolors.co/](https://coolors.co/)
- Shoguneagle, (30 enero 2015). _McDaniels Shipwrights Condor-class gunship_. Nombre del sitio web: [https://www.deviantart.com/shoguneagle/art/McDaniels-Shipwrights-Condor-class-gunship-510541336](https://www.deviantart.com/shoguneagle/art/McDaniels-Shipwrights-Condor-class-gunship-510541336)
- Euderion, (13 oct 2018). _Turian Shuttles_. Nombre del sitio web: [https://www.deviantart.com/euderion/art/Turian-Shuttles-768172079](https://www.deviantart.com/euderion/art/Turian-Shuttles-768172079)
- GoatMutation, (4 feb 2020). _Neon Sunset on an alien planet?_. Nombre del sitio web: [https://www.deviantart.com/goatmutation/art/Neon-Sunset-on-an-alien-planet-829231654](https://www.deviantart.com/goatmutation/art/Neon-Sunset-on-an-alien-planet-829231654)
- QAuZ, (1 diciembre 2015). _Space Travel_. Nombre del sitio web: [https://www.deviantart.com/qauz/art/Space-Travel-575566386](https://www.deviantart.com/qauz/art/Space-Travel-575566386)
- Konami, (1985). _Gradius_. Nombre del sitio web: [https://es.wikipedia.org/wiki/Gradius](https://es.wikipedia.org/wiki/Gradius)
- Konami, (1988). _Gradius II_. Nombre del sitio web: [https://es.wikipedia.org/wiki/Gradius_II](https://es.wikipedia.org/wiki/Gradius_II)
- Atari Inc, (Noviembre 1979). _Asteroids_. Nombre del sitio web: [https://en.wikipedia.org/wiki/Asteroids_%28video_game%29](https://en.wikipedia.org/wiki/Asteroids_%28video_game%29)

**Fase 2:**

- Pixabay, (9 agosto 2022). _Laser Gun_. Nombre del sitio web: [https://pixabay.com/es/sound-effects/laser-gun-81720/](https://pixabay.com/es/sound-effects/laser-gun-81720/)
- Pixabay, (6 julio 2022). _010406_Rocket Thrust effect_. Nombre del sitio web: [https://pixabay.com/es/sound-effects/010406-rocket-thrust-effectwav-59704/](https://pixabay.com/es/sound-effects/010406-rocket-thrust-effectwav-59704/)
- Craftron Gaming, (12 julio 2015). _Minecraft_. Nombre del sitio web: [https://www.dafont.com/es/minecraft.font](https://www.dafont.com/es/minecraft.font)
- photonstorm, (abril 2023). _asteroids movement_. Nombre del sitio web: [https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/asteroids%20movement.js](https://github.com/photonstorm/phaser3-examples/blob/master/public/src/physics/arcade/asteroids%20movement.js)
