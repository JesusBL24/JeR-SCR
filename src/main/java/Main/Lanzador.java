package Main;

import Main.WebSockets.MatchHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class Lanzador implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createMatchHandler(), "/matchHandler")
				.setAllowedOrigins("*");
	}

	@Bean
	public MatchHandler createMatchHandler() {
		return new MatchHandler();
	}

	public static void main(String[] args) {
		//COMPROBAMOS QUE ESTAMOS EN LA VERSIÓN CORRECTA DE JAVA
		String version = System.getProperty("java.version");
		if(version.contains("1.8"))
			SpringApplication.run(Lanzador.class, args);
		else
			System.out.println("Versión de java no valida, se necesita la versión de java 1.8\nTu versión es: " + version);
	}
}

