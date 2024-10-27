// Clase que representa una encuesta
class Encuesta {
    constructor(pregunta, opciones) {
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.votaciones = new Array(opciones.length).fill(0);
    }

    registrarVoto() {
        const opcionesTexto = this.opciones
            .map((opcion, indice) => `${indice + 1}. ${opcion}`)
            .join('\n');
        const respuestaUsuario = prompt(`${this.pregunta}\n${opcionesTexto}\nPor favor, introduce el número de tu voto:`);

        const indiceVoto = parseInt(respuestaUsuario, 10) - 1;

        if (indiceVoto >= 0 && indiceVoto < this.votaciones.length) {
            this.votaciones[indiceVoto]++;
        } else {
            alert("Entrada no válida. Asegúrate de ingresar un número entre 1 y " + this.opciones.length);
        }
    }

    mostrarResultados() {
        console.log(`Resultados de la encuesta: "${this.pregunta}"`);
        this.opciones.forEach((opcion, indice) => {
            console.log(`${opcion}: ${this.votaciones[indice]} voto(s)`);
        });
        console.log(''); // Separador entre encuestas
    }
}

// Clase responsable de administrar las encuestas
class GestorEncuestas {
    constructor() {
        this.encuestas = [];
    }

    solicitarPreguntaEncuesta() {
        return prompt("Escribe la pregunta para comenzar la encuesta");
    }

    validarEntradaTexto() {
        let texto = "";
        while (texto.trim() === "") {
            texto = prompt("Introduce una opción para la encuesta").trim().toLowerCase();
        }
        return texto;
    }

    recopilarOpcionesDelUsuario() {
        const opciones = [];
        let agregarMas = true;

        while (agregarMas || opciones.length < 2) {
            let opcion = this.validarEntradaTexto();
            opciones.push(opcion);

            agregarMas = prompt("¿Quieres agregar otra opción? s/n").trim().toLowerCase() === 's';

            if (opciones.length < 2) {
                alert("Se requieren al menos dos opciones");
            }
        }

        return opciones;
    }

    crearEncuesta() {
        const pregunta = this.solicitarPreguntaEncuesta();
        const opciones = this.recopilarOpcionesDelUsuario();
        const nuevaEncuesta = new Encuesta(pregunta, opciones);

        this.encuestas.push(nuevaEncuesta);
        nuevaEncuesta.registrarVoto();

        // Mostrar resultados de la encuesta actual
        nuevaEncuesta.mostrarResultados();

        // Mostrar resultados de todas las encuestas
        this.mostrarResultadosDeTodasLasEncuestas();
    }

    mostrarResultadosDeTodasLasEncuestas() {
        this.encuestas.forEach((encuesta, indice) => {
            console.log(`Encuesta ${indice + 1}:`);
            encuesta.mostrarResultados();
        });
    }
}

// Iniciar el proceso de la encuesta
const gestorEncuestas = new GestorEncuestas();
gestorEncuestas.crearEncuesta();
