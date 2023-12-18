package Main.Clases;

import java.io.*;
import java.util.ArrayList;

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

    //FUNCIÓN USADA PARA RECUPERAR UN USUARIO EXISTENTE EN LA BASE DEDATOS
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
                    //CREAMOS EL USUARIO
                    usuario = new Usuario(partes[0], partes[1]);
                    //CERRAMOS EL ARCHIVO
                    br.close();
                    fr.close();
                    //DEVOLVEMOS EL USUARIO
                    return usuario;
                }
            }
            //CERRAMOS EL ARCHIVO
            br.close();
            fr.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }

        //SI ALGO FALLA, DEVOLVEMOS NULL
        return usuario;
    }

    //FUNCIÓN USADA PARA INSERTAR UN USUARIO EN LA BASE DE DATOS
    public static boolean insertarUsuario(Usuario usuario){
        //ABRIMOS EL ARCHIVO, Y CREAMOS LO NECESARIO PARA ESCRIBIR
        try (FileWriter fw = new FileWriter("RecursosRest/Usuarios", true)) {
            BufferedWriter bw = new BufferedWriter(fw);
            PrintWriter pw = new PrintWriter(bw);

            //INSERTAMOS EL NUEVO USUARIO AL FINAL DEL ARCHIVO
            pw.println(usuario.getNombre() +":"+usuario.getPassword());

            //CERRAMOS EL ARCHIVO
            pw.close();
            bw.close();
            fw.close();

            //DEVOLVEMOS TRUE
            return true;
        } catch (Exception e) {
            //SI ALGO FALLA, DEVOLVEMOS FALSE
            e.printStackTrace();
            return false;
        }

    }

    //FUNCIÓN USADA PARA ELIMINAR USUARIOS DE LA BASE DE DATOS
    public static boolean eliminarUsuario(Usuario usuario){

        String usuarioABorrar = usuario.getNombre() + ":" + usuario.getPassword();

        //GUARDAMOS LAS LINEAS DEL FICHERO EN UN ARRAY
        ArrayList<String> lineas = new ArrayList<String>();
        try (FileReader fr = new FileReader("RecursosRest/Usuarios")) {
            BufferedReader br = new BufferedReader(fr);

            //LEEMOS LAS LINEAS DEL FICHERO
            String linea;
            while((linea=br.readLine())!=null){
                lineas.add(linea);
            }
            //CERRAMOS EL ARCHIVO
            br.close();
            fr.close();
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }

        //ELIMINAMOS DE LA LISTA EL USUARIO A BORRAR
        lineas.remove(usuarioABorrar);

        //ABRIMOS EL ARCHIVO, Y CREAMOS LO NECESARIO PARA ESCRIBIR
        try (FileWriter fw = new FileWriter("RecursosRest/Usuarios")) {
            BufferedWriter bw = new BufferedWriter(fw);
            PrintWriter pw = new PrintWriter(bw);

            //REESCRIBIMOS EL FICHERO, SIN LA LINEA CORRESPONDIENTE AL USUARIO A BORRAR
            for(String linea:lineas){
                pw.println(linea);
            }

            //CERRAMOS EL ARCHIVO
            pw.close();
            bw.close();
            fw.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    //FUNCIÓN PARA ACTUALIZAR UN USUARIO
    public static boolean actualizarUsuario(ArrayList<Usuario> usuarios){

        String usuarioAActualizar = usuarios.get(0).getNombre() + ":" + usuarios.get(0).getPassword();
        String usuarioActualizado = usuarios.get(1).getNombre() + ":" + usuarios.get(1).getPassword();

        //GUARDAMOS LAS LINEAS DEL FICHERO EN UN ARRAY
        ArrayList<String> lineas = new ArrayList<String>();
        try (FileReader fr = new FileReader("RecursosRest/Usuarios")) {
            BufferedReader br = new BufferedReader(fr);

            //LEEMOS LAS LINEAS DEL FICHERO
            String linea;
            while((linea=br.readLine())!=null){
                lineas.add(linea);
            }
            //CERRAMOS EL ARCHIVO
            br.close();
            fr.close();
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }

        //ACTUALIZAMOS EL USUARIO
        lineas.set(lineas.indexOf(usuarioAActualizar), usuarioActualizado);

        //ABRIMOS EL ARCHIVO, Y CREAMOS LO NECESARIO PARA ESCRIBIR
        try (FileWriter fw = new FileWriter("RecursosRest/Usuarios")) {
            BufferedWriter bw = new BufferedWriter(fw);
            PrintWriter pw = new PrintWriter(bw);

            //REESCRIBIMOS EL FICHERO, CON LA LINEA CORRESPONDIENTE AL USUARIO ACTUALIZADA
            for(String linea:lineas){
                pw.println(linea);
            }

            //CERRAMOS EL ARCHIVO
            pw.close();
            bw.close();
            fw.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
