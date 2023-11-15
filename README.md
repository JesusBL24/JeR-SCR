# S.C.P. (SPACE COMBAT RUSH)
---


"Space Combat Rush" es un juego multijugador con vista cenital en el que dos o más jugadores se enfrentarán en batallas de naves espaciales en un campo de asteroides. Cada jugador controlará una nave y su misión será acabar con el resto de jugadores; mientras navega evitando los asteroides y destruyéndolos para conseguir mejoras para su nave.


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

En cuanto a la interfaz externa a la partida, en primer lugar tenemos un menú inicial compuesto de 3 opciones: “start”, donde se dará comienzo al juego, “about the game”, donde se explicará brevemente la historia del juego, y “settings“, donde se pondrán algunos ajustes tales como el sonido.

Y, respecto a la de dentro de la partida, tendremos una interfaz sencilla, similar a la de juegos de lucha como [Street Fighter](https://es.wikipedia.org/wiki/Street_Fighter) [Figura 1: ejemplo Street Fighter](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/SFII.webp) compuesta únicamente de:

-   **Barra de vida**: se indicará de esta forma la vida de cada jugador presente en la arena de combate.

-   **Cuenta atrás**: contendrá además una cuenta atrás para informar del tiempo que queda de combate.

-   **Círculos de boosters**: se representará mediante círculos pequeños en la parte inferior de la pantalla los distintos boosters (refuerzos tales como + velocidad) que consiga cada jugador.

<img src="https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/SFII.webp" width=600 heigth=300>

[Figura 1: ejemplo Street Fighter](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/SFII.webp)

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

Tal como se ha ido mencionando durante el documento, este juego seguirá la estética pixel art similar a otros juegos como Gradius o Asteoids. Con una paleta de color más oscura y algunos pocos colores más llamativos para crear contraste. Generalmente buscaremos transmitir una sensación de mayor seriedad. La paleta a seguir de guía será la siguiente:

![Paleta de colores](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Paleta.PNG)

A continuación se presentarán algunos concepts de los aviones y entornos. Estos serán tanto diseñados por nuestro equipo, como cogidos de referencia de otras fuentes.

Aunque, según avance el desarrollo del juego, se generarán todos los sprites de forma original por nuestro grupo y se incorporarán en el documento.

### Concept de aviones:

![Boceto Naves](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Naves%20Boceto.jpg)

![Naves](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Naves.jpg)

![McDaniels Shipwrights Condor-class gunship](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/NaveReferencia1.jpg)

[McDaniels Shipwrights Condor-class gunship](https://www.deviantart.com/adamkop/art/McDaniels-Shipwrights-Condor-class-gunship-517563452)

![Turian Shuttles](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/NaveReferencia2.jpg)

[Turian Shuttles](https://www.deviantart.com/euderion/art/Turian-Shuttles-768172079)


### Referencias para entornos:

![Neon Sunset on an alien planet?](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/neonSunset.jpg)

[Neon Sunset on an alien planet?](https://www.deviantart.com/goatmutation/art/Neon-Sunset-on-an-alien-planet-829231654)

![# Space Travel](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/spaceTravel.jpg)

[Space Travel](https://www.deviantart.com/qauz/art/Space-Travel-575566386)

![# Gradius II](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Gradius-II-1-Fire-Dragons-1.jpg)

[Gradius II](https://es.wikipedia.org/wiki/Gradius_II)


## Referencias

Para crear este juego hemos partido principalmente de dos fuentes de inspiración.

El juego [Asteroids](https://en.wikipedia.org/wiki/Asteroids_%28video_game%29) de Atari de 1979, del que tomamos prestado tanto la localización y la perspectiva como el control general de las naves.

![# Asteroids](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Asteroids.PNG)

Y la saga de juegos de Konami [Gradius](https://es.wikipedia.org/wiki/Gradius). En los que nos hemos fijado para diseñar las distintas mejoras que podemos conseguir para nuestra nave (vida/escudos, velocidad o distintas armas) al destruir algunos de los asteroides.

![# Asteroids](https://raw.githubusercontent.com/jagonmes/Imagenes-JeR/main/Gradius.jpg)
