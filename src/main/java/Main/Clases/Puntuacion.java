package Main.Clases;

import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class Puntuacion{

	private String id; //Nombre
	private int puntuacion; //Puntuacion que ha conseguido
	private int posicion; //Posicion en el ranking

	public Puntuacion() {
	}

	public Puntuacion(int posicionSet, String idSet, int puntuacionSet) {
		posicion = posicionSet;
		id = idSet;
		puntuacion = puntuacionSet;
	}
	//añadimos los get y set necesarios

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}

	public void setPosicion(int posicionSet) {
		this.posicion = posicionSet;
	}

	public int getPosicion() {
		return posicion;
	}
}
