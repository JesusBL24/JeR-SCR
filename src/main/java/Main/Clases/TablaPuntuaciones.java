package Main.Clases;



import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
public class TablaPuntuaciones {
	//LISTA DE PUNTUACIONES
    private List<Puntuacion> puntuaciones;

	public List<Puntuacion> getPuntuaciones() {
		return puntuaciones;
	}

	public Puntuacion getPuntuacion(int index) {
		return puntuaciones.get(index);
	}

	public TablaPuntuaciones(){
        puntuaciones = leerPuntuaciones();
    }

	//FUNCION QUE LEE LAS PUNTUACIONES DEL ARCHIVO
    private List<Puntuacion> leerPuntuaciones() {

		List<Puntuacion> puntuaciones = new ArrayList<>();

		//INTENTAMOS ABRIR LAS LINEAS DEL FICHERO
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

	}

	public void CompararPuntuacion(){

	}

	//FUNCIÓN PARA ACTUALIZAR UN USUARIO
	public int actualizarPuntuaciones(Puntuacion puntuacionToSet){

		//SI LA PUNTUACION NO ENTRA LA RANKING DEVUELVE 0
		if(puntuacionToSet.getPuntuacion() < puntuaciones.get(4).getPuntuacion()){return 0;}

		//String usuarioAActualizar = usuarios.get(0).getNombre() + ":" + usuarios.get(0).getPassword();
		//String usuarioActualizado = usuarios.get(1).getNombre() + ":" + usuarios.get(1).getPassword();
		this.puntuaciones.add(puntuacionToSet);
		Collections.sort(this.puntuaciones, Comparator.comparingInt(Puntuacion::getPuntuacion).reversed());
		this.puntuaciones.remove(5);


		//ABRIMOS EL ARCHIVO, Y CREAMOS LO NECESARIO PARA ESCRIBIR
		try (FileWriter fw = new FileWriter("RecursosRest/Puntuaciones",false)) {
			BufferedWriter bw = new BufferedWriter(fw);
			PrintWriter pw = new PrintWriter(bw);

			// RECORREMOS LAS LÍNEAS Y LAS ESCRIBIMOS
			for (int i = 0 ; i < this.puntuaciones.size(); i++) {
				this.puntuaciones.get(i).setPosicion(i);
				Puntuacion puntuacion = this.puntuaciones.get(i);
				String linea = puntuacion.getPosicion() + ":" + puntuacion.getId() + ":" + puntuacion.getPuntuacion();
				//GUARDAMOS EN EL ARCHIVO LAS PUNTUACIONES
				pw.println(linea);
			}


			//CERRAMOS EL ARCHIVO
			pw.close();
			bw.close();
			fw.close();
		}
		//SI HAY EXCEPCION DEVUELVE 1
		catch (Exception e) {
			e.printStackTrace();
			return 1;
		}

		//SI SE HA CAMBIADO LA PUNTUACION DEVUELVE 2
		return 2;
	}


}
