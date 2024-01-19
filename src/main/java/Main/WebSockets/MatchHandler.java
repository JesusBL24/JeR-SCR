package Main.WebSockets;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

public class MatchHandler extends TextWebSocketHandler {

    //PAREJAS DE JUGADORES
    private Map<String, String> parejas = new ConcurrentHashMap<>();

    //LISTA DE JUGADORES BUSCANDO OPONENTE
    private List<String> jugadoresBuscandoOponente = new ArrayList<>();

    //TOTAL DE SESIONES
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    //GENERADOR DE NUMEROS ALEATORIOS
    Random random = new Random();

    //ALMACENA LA SESION EN EL MAPA DE SESIONES Y COMPRUEBA SI HAY JUGADORES BUSCANDO OPONENTE
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("NUEVO USUARIO CONECTADO: " + session.getId());
        sessions.put(session.getId(), session);

        //COMPRUEBA SI LA LISTA DE JUGADORES BUSCANDO OPONENTE ESTA VACIA
        //SI ESTA VACIA, SE AÑADE EL ID DE LA SESION A LA LISTA
        if(jugadoresBuscandoOponente.isEmpty())
            jugadoresBuscandoOponente.add(session.getId());
        //SI NO ESTA VACIA, EMPAREJA A LOS JUGADORES Y LOS ELIMINA DE LA LISTA
        else
        {
            String[] pareja = {jugadoresBuscandoOponente.get(0), session.getId()};
            parejas.put(pareja[0], pareja[1]);
            parejas.put(pareja[1], pareja[0]);
            jugadoresBuscandoOponente.remove(0);

            //AVISA A LOS JUGADORES DE QUE SE HA ENCONTRADO OPONENTE
            oponenteEncontrado(pareja);
        }
    }

    //ELIMINA LA SESION DEL MAPA DE SESIONES, Y DEL DE PAREJAS, SI ESTA EN EL
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("SESION: " + session.getId() + " CERRADA");
        sessions.remove(session.getId());

        //SI ESTA EMPAREJADO, LO ELIMINA DEL MAPA DE PAREJAS
        if(parejas.containsKey(session.getId()))
        {
            parejas.remove(session.getId());
        }
        //SI NO ESTA EMPAREJADO, LO ELIMINA DE LA LISTA  DE JUGADORES BUSCANDO OPONENTE
        else if(jugadoresBuscandoOponente.contains(session.getId()))
        {
            jugadoresBuscandoOponente.remove(0);
        }
    }

    //RECIBE EL MENSAJE Y LO REENVIA AL OTRO JUGADOR
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("MENSAJE DE LA SESION: " + session.getId() + " RECIBIDO. MENSAJE: " + message.getPayload());
        mandarMensajeAPareja(session, message.getPayload());
    }

    //ENVIA EL MENSAJE A LA PAREJA DE LA SESION
    private void mandarMensajeAPareja(WebSocketSession session, String mensaje) throws IOException {
        if(parejas.containsKey(session.getId()))
        {
            sessions.get(parejas.get(session.getId())).sendMessage(new TextMessage(mensaje));
        }
    }

    //AVISA A LOS JUGADORES DE QUE SE HA ENCONTRADO UN OPONENTE (MANDANDOLES SU NUMERO DE JUGADOR)
    private void oponenteEncontrado(String[] jugadores) throws IOException {
        //GENERAMOS UN NUMERO ALEATORIO PARA VER QUIEN SERA EL JUGADOR 1 Y QUIEN EL 2
        int posicionSesion1 = random.nextInt(2) + 1;
        int posicionSesion2 = 3 - posicionSesion1;

        //SI LOS JUGADORES ESTAN EN EL MAPA DE SESIONES, SE LES MANDA UN MENSAJE, AVISANDO DE SU POSICION
        if(sessions.containsKey(jugadores[0]) && sessions.containsKey(jugadores[1]))
        {
            sessions.get(jugadores[0]).sendMessage(new TextMessage(Integer.toString(posicionSesion1)));
            sessions.get(jugadores[1]).sendMessage(new TextMessage(Integer.toString(posicionSesion2)));
        }
    }
}
