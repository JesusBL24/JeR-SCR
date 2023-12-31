package Main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Lanzador {

	public static void main(String[] args) {
		//COMPROBAMOS QUE ESTAMOS EN LA VERSIÓN CORRECTA DE JAVA
		String version = System.getProperty("java.version");
		if(version.contains("1.8"))
			SpringApplication.run(Lanzador.class, args);
		else
			System.out.println("Versión de java no valida, se necesita la versión de java 1.8\nTu versión es: " + version);
	}
}

