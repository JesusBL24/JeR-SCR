package Main.Controladores;

import Main.Clases.Puntuacion;
import Main.Clases.TablaPuntuaciones;
import Main.Clases.Usuario;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/puntuaciones")
public class PuntuacionesController {
	//public static final String FICHERO_PUNTUACIONES = "Puntuaciones.txt";
	public static final String FICHERO_PUNTUACIONES = "Puntuaciones";
	Gson gson = new Gson();

	@GetMapping
	//devuelve la lista de puntuaciones
	public List<Puntuacion> getPuntuaciones() {

		TablaPuntuaciones puntuaciones = new TablaPuntuaciones();

		return puntuaciones.getPuntuaciones();
	}

@PutMapping
//actualiza las puntuaciones
public ResponseEntity<String> actualizarPuntuacion(@RequestBody String puntuacion) throws IOException {
	Puntuacion newPuntuacion = gson.fromJson(puntuacion, Puntuacion.class);
	System.out.println(puntuacion);

	//SI ALGUNO DE LOS CAMPOS ES NULL, DEVOLVEMOS QUE EL CUERPO ES INVALIDO
	if((newPuntuacion.getPuntuacion() == 0) || (newPuntuacion.getId() == null || newPuntuacion.getId().isEmpty()))
		return new ResponseEntity<String>("ERROR: CUERPO INVALIDO",HttpStatus.BAD_REQUEST);
	TablaPuntuaciones puntuaciones = new TablaPuntuaciones();

	switch (puntuaciones.actualizarPuntuaciones(newPuntuacion)){

		//LA PUNTUACION NO ENTRA AL RANKING
		case 0:
			return new ResponseEntity<String>("PUNTUACIÓN BAJA", HttpStatus.OK);
			//break;
		//ERROR
		case 1:
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			//break;
		//PUNTUACIONES CAMBIADAS
		case 2:
			return new ResponseEntity<String>("PUNTUACIONES ACTUALIZADAS", HttpStatus.OK);
			//break;
		default:
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			//break;
	}

}
	/*
	private List<Puntuacion> leerPuntuaciones() {
		//leemos las puntuaciones
		List<Puntuacion> puntuaciones = new ArrayList<>();
		try {
			JsonReader reader = new JsonReader(new FileReader(FICHERO_PUNTUACIONES));

			Type type = new TypeToken<List<Puntuacion>>() {
			}.getType();
			puntuaciones = gson.fromJson(reader, type);
		} catch (IOException exception) {}
		return puntuaciones;
	}

	//FUNCION PARA LEER TODAS LAS PUNTUACIONES
	private List<Puntuacion> leerPuntuaciones() {
		//leemos las puntuaciones
		List<Puntuacion> puntuaciones = new ArrayList<>();
		try (FileReader fr = new FileReader("RecursosRest/Puntuaciones")) {
			BufferedReader br = new BufferedReader(fr);

			//LEEMOS LAS LINEAS DEL FICHERO
			String linea;
			while ((linea = br.readLine()) != null) {

				//SEPARAMOS EL NOMBRE Y LA CONTRASEÑA
				String partes[] = linea.split(":");

				puntuaciones.add(new Puntuacion(Integer.parseInt(partes[0]), partes[1], Integer.parseInt(partes[2])));
			}
			//CERRAMOS EL ARCHIVO
			br.close();
			fr.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		//SI ALGO FALLA, DEVOLVEMOS NULL
		return puntuaciones;

	}*/
}
