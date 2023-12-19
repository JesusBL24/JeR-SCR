package Main.Clases;

import java.util.ArrayList;

public class ClientesConectados {
    private static int numeroDeClientesConectados = 0;

    public static int getNumeroDeClientesConectados() {
        return numeroDeClientesConectados;
    }

    public static void aumentarNumeroDeClientesConectados() {
        ClientesConectados.numeroDeClientesConectados++;
    }

    public static void decrementarNumeroDeClientesConectados() {
        ClientesConectados.numeroDeClientesConectados--;
        if(ClientesConectados.numeroDeClientesConectados < 0)
            ClientesConectados.numeroDeClientesConectados = 0;
    }
}
