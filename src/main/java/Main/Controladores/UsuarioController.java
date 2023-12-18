package Main.Controladores;

import Main.Clases.Usuario;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	Gson gson = new Gson();

	@GetMapping
	//DEVUELVE UN USUARIO
	public String getUsuario(@RequestBody String JSon) {
		try{
			//INTENTAMOS GENERAR EL USUARIO, A PARTIR DEL CUERPO DEL MENSAJE
			Usuario usuario = gson.fromJson(JSon, Usuario.class);

			//SI LO GENERAMOS CON EXITO, COMPROBAMOS SI EXISTE
			Usuario usuarioEnBaseDeDatos = Usuario.recuperarUsuario(usuario.getNombre());

			//SI EXISTE COMPROBAMOS LA CONTRASEÑA
			if(usuarioEnBaseDeDatos != null)
				if(usuarioEnBaseDeDatos.getPassword().equals(usuario.getPassword()))
					return "USUARIO AUTENTICADO";
				else
					return "CONTRASEÑA INVALIDA";
			//SI NO EXISTE, MANDAMOS EL MENSAJE DE CREAR NUEVO USUARIO
			else
				return "CREAR NUEVO USUARIO";
		}
		catch(Exception e){
			//e.printStackTrace();
			return "CUERPO INVALIDO";
		}
	}

}
