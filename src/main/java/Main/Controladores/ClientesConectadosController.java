package Main.Controladores;
import Main.Clases.ClientesConectados;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/clientesConectados")
public class ClientesConectadosController {
	Gson gson = new Gson();

	//AUMENTA EL NUMERO DE CLIENTES CONECTADOS
	@PostMapping("/conectar")
	public ResponseEntity<Integer> nuevoCliente(){
		ClientesConectados.aumentarNumeroDeClientesConectados();
		return new ResponseEntity<Integer>(ClientesConectados.getNumeroDeClientesConectados(), HttpStatus.OK);
	}

	//DISMINUYE EL NUMERO DE CLIENTES CONECTADOS
	@PostMapping("/desconectar")
	public ResponseEntity<Integer> clienteDesconectado(){
		ClientesConectados.decrementarNumeroDeClientesConectados();
		return new ResponseEntity<Integer>(ClientesConectados.getNumeroDeClientesConectados(), HttpStatus.OK);
	}

	//DEVUELVE EL NÚMERO DE CLIENTES CONECTADOS
	@GetMapping
	public ResponseEntity<Integer> clientesConectados(){
		return new ResponseEntity<Integer>(ClientesConectados.getNumeroDeClientesConectados(), HttpStatus.OK);
	}

}
