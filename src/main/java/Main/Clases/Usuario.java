package Main.Clases;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;

public class Usuario {
    private String nombre;
    private String password;

    public Usuario(String nombre, String password){
        this.nombre = nombre;
        this.password = password;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "nombre='" + nombre + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public static Usuario recuperarUsuario(String nombreDeUsuario){
        Usuario usuario = null;

        //ABRIMOS EL ARCHIVO A LEER
        try (FileReader fr = new FileReader("RecursosRest/Usuarios")) {
            BufferedReader br = new BufferedReader(fr);

            //LEEMOS LAS LINEAS DEL FICHERO
            String linea;
            while((linea=br.readLine())!=null){

                //SEPARAMOS EL NOMBRE Y LA CONTRASEÑA
                String partes[] = linea.split(":");

                //SI EL NOMBRE DE USUARIO COINCIDE, DEVOLVEMOS EL USUARIO
                if(partes[0].equals(nombreDeUsuario)){
                    usuario = new Usuario(partes[0], partes[1]);
                    return usuario;
                }
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }

        return usuario;
    }

    public static boolean insertarUsuario(Usuario usuario){
        try (FileWriter fichero = new FileWriter("RecursosRest/Usuarios"))
        {


                fichero.write("\n");



        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
