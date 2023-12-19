package Main.Controladores;
import Main.Clases.Usuario;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	Gson gson = new Gson();

	@GetMapping
	//USAMOS GET PARA AUTENTICAR AL USUARIO
	public ResponseEntity<String> autenticarUsuario(@RequestHeader("usuario") String cabecera) {
		try{
			//INTENTAMOS GENERAR EL USUARIO, A PARTIR DE LA CABECERA "usuario" DEL MENSAJE
			Usuario usuario = gson.fromJson(cabecera, Usuario.class);

			//SI ALGUNO DE LOS CAMPOS ES NULL, DEVOLVEMOS QUE EL CUERPO ES INVALIDO
			if((usuario.getNombre() == null || usuario.getNombre().isEmpty()) || (usuario.getPassword() == null || usuario.getPassword().isEmpty()))
				return new ResponseEntity<String>("ERROR: CABECERA INVALIDA",HttpStatus.BAD_REQUEST);

			//COMPROBAMOS SI EXISTE EL USUARIO EN LA BASE DE DATOS
			Usuario usuarioEnBaseDeDatos = Usuario.recuperarUsuario(usuario.getNombre());

			//SI EXISTE COMPROBAMOS LA CONTRASEÑA
			if(usuarioEnBaseDeDatos != null){
				if(usuarioEnBaseDeDatos.getPassword().equals(usuario.getPassword()))
					return new ResponseEntity<String>("USUARIO AUTENTICADO", HttpStatus.OK);
				else
					return new ResponseEntity<String>("ERROR: CONTRASEÑA INVALIDA", HttpStatus.BAD_REQUEST);
			}
			//SI NO EXISTE, MANDAMOS EL MENSAJE DE CREAR NUEVO USUARIO
			else
				return new ResponseEntity<String>("CREAR NUEVO USUARIO", HttpStatus.OK);

		}
		catch(Exception e){
			//SI NO SE PUEDE GENERAR EL USUARIO A PARTIR DE LA CABECERA DEL MENSAJE, SE LANZA UN ERROR
			return new ResponseEntity<String>("ERROR: CABECERA INVALIDA",HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public ResponseEntity<String> postUsuario(@RequestBody String JSon){
		System.out.println(JSon);
		try{
			//INTENTAMOS GENERAR EL USUARIO, A PARTIR DEL CUERPO DEL MENSAJE
			Usuario usuario = gson.fromJson(JSon, Usuario.class);

			//SI ALGUNO DE LOS CAMPOS ES NULL, DEVOLVEMOS QUE EL CUERPO ES INVALIDO
			if((usuario.getNombre() == null || usuario.getNombre().isEmpty()) || (usuario.getPassword() == null || usuario.getPassword().isEmpty()))
				return new ResponseEntity<String>("ERROR: CUERPO INVALIDO",HttpStatus.BAD_REQUEST);

			//SI EL USUARIO YA EXISTE, DEVOLVEMOS QUE ESTE YA EXISTE
			if(Usuario.recuperarUsuario(usuario.getNombre()) != null)
				return new ResponseEntity<String>("ERROR: EL USUARIO YA EXISTE",HttpStatus.INTERNAL_SERVER_ERROR);

			//SE INTENTA AÑADIR EL USUARIO A LA BASE DE DATOS, EN CASO DE FALLAR, SE DEVUELVE UN MENSAJE DE ERROR
			if(Usuario.insertarUsuario(usuario))
				return new ResponseEntity<String>("USUARIO CREADO Y AUTENTICADO", HttpStatus.CREATED);
			else
				return new ResponseEntity<String>("ERROR: NO SE PUDO AÑADIR EL USUARIO",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		catch(Exception e){
			//SI NO SE PUEDE GENERAR EL USUARIO A PARTIR DEL CUERPO DEL MENSAJE, SE LANZA UN ERROR
			return new ResponseEntity<String>("ERROR: CUERPO INVALIDO",HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping
	public ResponseEntity<String> putUsuario(@RequestBody String JSon){
		try{
			//DEFINIMOS EL TIPO LISTA DE USUARIOS
			Type listaDeUsuarios= new TypeToken<ArrayList<Usuario>>() {}.getType();

			//INTENTAMOS GENERAR EL USUARIO y EL USUARIO ACTUALIZADO, A PARTIR DEL CUERPO DEL MENSAJE
			ArrayList<Usuario> usuarios = gson.fromJson(JSon, listaDeUsuarios);

			//SI ALGUNO DE LOS CAMPOS ES NULL, DEVOLVEMOS QUE EL CUERPO ES INVALIDO
			if((usuarios.get(0).getNombre() == null || usuarios.get(0).getNombre().isEmpty()) || (usuarios.get(0).getPassword() == null || usuarios.get(0).getPassword().isEmpty()))
				return new ResponseEntity<String>("ERROR: CUERPO INVALIDO",HttpStatus.BAD_REQUEST);
			if((usuarios.get(1).getNombre() == null || usuarios.get(1).getNombre().isEmpty()) || (usuarios.get(1).getPassword() == null || usuarios.get(1).getPassword().isEmpty()))
				return new ResponseEntity<String>("ERROR: CUERPO INVALIDO",HttpStatus.BAD_REQUEST);

			//COMPROBAMOS QUE EL NUEVO NOMBRE NO EXISTA YA (SIEMPRE QUE SEA DISTINTO AL ORIGINAL)
			if(!usuarios.get(0).getNombre().equals(usuarios.get(1).getNombre()) && Usuario.recuperarUsuario(usuarios.get(1).getNombre()) != null)
				return new ResponseEntity<String>("ERROR: EL NUEVO NOMBRE DE USUARIO YA ESTA EN USO",HttpStatus.BAD_REQUEST);

			//COMPROBAMOS QUE EL USUARIO EXISTA
			Usuario usuarioEnBaseDeDatos = Usuario.recuperarUsuario(usuarios.get(0).getNombre());
			if(usuarioEnBaseDeDatos != null) {
				//COMPROBAMOS LA CONTRASEÑA
				if (usuarioEnBaseDeDatos.getPassword().equals(usuarios.get(0).getPassword())) {
					if(Usuario.actualizarUsuario(usuarios))
						return new ResponseEntity<String>("USUARIO ACTUALIZADO", HttpStatus.OK);
					else
						return new ResponseEntity<String>("ERROR: NO SE HA PODIDO ACTUALIZAR EL USUARIO", HttpStatus.INTERNAL_SERVER_ERROR);
				}
				//SI LA CONTRASEÑA ES ERRONEA, SE LANZA UN ERROR
				else {
					return new ResponseEntity<String>("ERROR: CONTRASEÑA INVALIDA",HttpStatus.BAD_REQUEST);
				}
			}
			//SI EL USUARIO NO EXISTE, LANZAMOS UN ERROR
			else
				return new ResponseEntity<String>("ERROR: EL USUARIO NO EXISTE",HttpStatus.BAD_REQUEST);

		}
		catch(Exception e){
			//SI NO SE PUEDE GENERAR EL USUARIO A PARTIR DEL CUERPO DEL MENSAJE, SE LANZA UN ERROR
			System.out.println("ES ESTE FALLO");
			return new ResponseEntity<String>("ERROR: CUERPO INVALIDO",HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping
	public ResponseEntity<String> deleteUsuario(@RequestHeader("usuario") String cabecera){
		try{
			//INTENTAMOS GENERAR EL USUARIO, A PARTIR DE LA CABECERA "usuario" DEL MENSAJE
			Usuario usuario = gson.fromJson(cabecera, Usuario.class);

			//SI ALGUNO DE LOS CAMPOS ES NULL, DEVOLVEMOS QUE EL CUERPO ES INVALIDO
			if((usuario.getNombre() == null || usuario.getNombre().isEmpty()) || (usuario.getPassword() == null || usuario.getPassword().isEmpty()))
				return new ResponseEntity<String>("ERROR: CABECERA INVALIDA",HttpStatus.BAD_REQUEST);

			//COMPROBAMOS SI EXISTE EL USUARIO EN LA BASE DE DATOS
			Usuario usuarioEnBaseDeDatos = Usuario.recuperarUsuario(usuario.getNombre());

			//SI EXISTE COMPROBAMOS LA CONTRASEÑA, EN CASO DE COINCIDIR, ELIMINAMOS EL USUARIO
			if(usuarioEnBaseDeDatos != null) {
				if (usuarioEnBaseDeDatos.getPassword().equals(usuario.getPassword())){
					if(Usuario.eliminarUsuario(usuario))
						return new ResponseEntity<String>("USUARIO ELIMINADO", HttpStatus.OK);
					else
						return new ResponseEntity<String>("ERROR: NO SE HA PODIDO ELIMINAR AL USUARIO", HttpStatus.INTERNAL_SERVER_ERROR);
				}

				else
					return new ResponseEntity<String>("ERROR: CONTRASEÑA INVALIDA", HttpStatus.BAD_REQUEST);
			}
			//SI NO EXISTE ENVIAMOS UN MENSAJE DICIENDO QUE NO EXISTE
			else
				return new ResponseEntity<String>("ERROR: EL USUARIO NO EXISTE",HttpStatus.BAD_REQUEST);
		}
		catch(Exception e){
			//SI NO SE PUEDE GENERAR EL USUARIO A PARTIR DE LA CABECERA DEL MENSAJE, SE LANZA UN ERROR
			return new ResponseEntity<String>("ERROR: CABECERA INVALIDA",HttpStatus.BAD_REQUEST);
		}
	}

}
