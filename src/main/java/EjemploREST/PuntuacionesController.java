package EjemploREST;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/puntuaciones")
public class PuntuacionesController {
	public static final String FICHERO_PUNTUACIONES = "puntuaciones.txt";
	Gson gson = new Gson();

	@GetMapping
	//devuelve la lista de puntuaciones
	public List<Puntuacion> getPuntuaciones() {

		List<Puntuacion> puntuaciones = leerPuntuaciones();
		return puntuaciones;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	//crea la lista de puntuaciones
	public Puntuacion nuevaPuntuacion(@RequestBody Puntuacion puntuacion) throws IOException {

		List<Puntuacion> puntuaciones = leerPuntuaciones();

		puntuaciones.add(puntuacion);
	//y las añadimos a un fichero
		try(FileWriter writer = new FileWriter(FICHERO_PUNTUACIONES)) {
			gson.toJson(puntuaciones, writer);
			writer.flush();
		}

		return puntuacion;
	}

	@PutMapping
	//actualiza las puntuaciones
	public ResponseEntity<Puntuacion> actualizarPuntuacion(@RequestBody Puntuacion puntuacion) throws IOException {
		List<Puntuacion> puntuaciones = leerPuntuaciones();
	//comparamos cada puntuacion y, si es mas alta que la actual, se sustituye
		for(int i = 0; i < puntuaciones.size(); i++) {
			Puntuacion puntuacionActual = puntuaciones.get(i);

			if(puntuacionActual.getId().equals(puntuacion.getId())
			&& puntuacion.getPuntuacion() > puntuacionActual.getPuntuacion()) {
				puntuaciones.remove(i);
				puntuaciones.add(puntuacion);

				try(FileWriter writer = new FileWriter(FICHERO_PUNTUACIONES)) {
					gson.toJson(puntuaciones, writer);
					//guardamos la puntuacion
					writer.flush();
				}
				//en caso de que se vaya a sustituir un dato de un usuario que exista --> OK
				return new ResponseEntity<>(HttpStatus.OK);
			}
		}
				//en caso de que se vaya a sustituir un dato de un usuario que no exista --> salta un error
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

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
}
