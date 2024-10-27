// Definimos el arreglo Encuestas para almacenar todas las encuestas creadas
const encuestasAlmacenadas = [];

// Función para asegurar que el texto proporcionado por el usuario no esté vacío
const comprobarTexto = () => {
    let textoIngresado = "";
    while (textoIngresado.trim() === "") {
        textoIngresado = prompt("Por favor, introduce una opción para la encuesta").trim().toLowerCase();
    }
    return textoIngresado;
}

// Función para solicitar la pregunta de la encuesta
const solicitarPreguntaEncuesta = () => {
    return prompt("Introduce la pregunta que deseas para la encuesta");
}

// Función para recopilar las opciones del usuario para la encuesta
const recogerOpcionesUsuario = () => {
    const listaOpciones = [];
    let continuarAñadiendo = true;

    while (continuarAñadiendo || listaOpciones.length < 2) {
        let opcion = comprobarTexto();
        listaOpciones.push(opcion);
        
        continuarAñadiendo = prompt("¿Deseas añadir otra opción? (s/n)").trim().toLowerCase() === 's';

        if (listaOpciones.length < 2) {
            alert("La encuesta debe tener al menos dos opciones");
        }
    }
 
    return listaOpciones;
}

// Función para construir una nueva encuesta con la pregunta y opciones dadas
const formarEncuesta = (pregunta, opciones) => {
    return {
        pregunta: pregunta,
        opciones: opciones,
        votos: new Array(opciones.length).fill(0)
    };
}

// Función para registrar el voto del usuario en una encuesta específica
const anotarVoto = (encuesta) => {
    const opcionesTexto = encuesta.opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join('\n');
    const respuestaDelUsuario = prompt(`${encuesta.pregunta}\n${opcionesTexto}\nIntroduce el número de la opción por la que deseas votar:`);

    const indiceDelVoto = parseInt(respuestaDelUsuario, 10) - 1;

    if (indiceDelVoto >= 0 && indiceDelVoto < encuesta.votos.length) {
        encuesta.votos[indiceDelVoto]++;
    } else {
        alert("Número no válido. Introduce un número entre 1 y " + encuesta.opciones.length);
    }
}

// Función para mostrar los resultados de una encuesta concreta
const exhibirResultadosEncuesta = (encuesta) => {
    console.log(`Resultados de la encuesta: "${encuesta.pregunta}"`);
    encuesta.opciones.forEach((opcion, index) => {
        console.log(`${opcion}: ${encuesta.votos[index]} voto(s)`);
    });
    console.log(''); // Espacio en blanco para separar encuestas
}

// Función para presentar los resultados de todas las encuestas guardadas
const presentarTodosResultados = () => {
    encuestasAlmacenadas.forEach((encuesta, index) => {
        console.log(`Encuesta ${index + 1}:`);
        exhibirResultadosEncuesta(encuesta);
    });
}

// Función principal para ejecutar el proceso de encuesta
const iniciarEncuesta = () => {
    const pregunta = solicitarPreguntaEncuesta();
    const opciones = recogerOpcionesUsuario();
    const nuevaEncuesta = formarEncuesta(pregunta, opciones);

    encuestasAlmacenadas.push(nuevaEncuesta);
    anotarVoto(nuevaEncuesta);

    // Mostrar los resultados de la encuesta recién creada
    exhibirResultadosEncuesta(nuevaEncuesta);

    // Mostrar los resultados de todas las encuestas registradas
    presentarTodosResultados();
}

// Ejecutar la encuesta
iniciarEncuesta();