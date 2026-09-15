/* =========================================================
   DETECTIVE
   CASO 001 - EL MÓVIL DE MARTA
========================================================= */


/* =========================================================
   NAVEGACIÓN GENERAL
========================================================= */

function mostrarPantalla(id) {

    document.querySelectorAll(".pantalla").forEach(pantalla => {
        pantalla.classList.remove("pantalla-activa");
    });

    const pantalla = document.getElementById(id);

    if (pantalla) {
        pantalla.classList.add("pantalla-activa");
    }
}


/* =========================================================
   TELÉFONO
========================================================= */

function abrirTelefono() {

    mostrarPantalla("telefono");

    actualizarHora();

    setInterval(actualizarHora, 60000);
}


function actualizarHora() {

    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");

    const elemento = document.getElementById("horaTelefono");

    if (elemento) {
        elemento.textContent = `${horas}:${minutos}`;
    }
}


/* =========================================================
   SISTEMA DE APPS
========================================================= */

let appActual = null;
let historialApp = [];

const nombresApps = {

    investigacion: "Investigación",
    mensajes: "Mensajes",
    telefonoApp: "Teléfono",
    fotos: "Fotos",
    mail: "Mail",
    calendario: "Calendario",
    mapas: "Mapas",
    contactos: "Contactos",
    notas: "Notas"

};


function abrirApp(nombre) {

    historialApp = [];

    appActual = nombre;

    const ventana = document.getElementById("ventanaApp");
    const titulo = document.getElementById("tituloApp");

    titulo.textContent = nombresApps[nombre] || "Aplicación";

    mostrarContenidoApp(nombre);

    ventana.classList.add("abierto");

}


function mostrarContenidoApp(nombre) {

    switch (nombre) {

        case "investigacion":
            mostrarInvestigacion();
            break;

        case "mensajes":
            mostrarListaConversaciones();
            break;

        case "telefonoApp":
            mostrarLlamadas();
            break;

        case "fotos":
            mostrarGaleriaFotos();
            break;

        case "mail":
            mostrarEmails();
            break;

        case "calendario":
            mostrarCalendario();
            break;

        case "mapas":
            mostrarMapa();
            break;

        case "contactos":
            mostrarContactos();
            break;

        case "notas":
            mostrarNotas();
            break;

    }
}


function volverDentroDeApp() {

    if (historialApp.length > 0) {

        const anterior = historialApp.pop();

        document.getElementById("tituloApp").textContent =
            nombresApps[anterior] || "Aplicación";

        appActual = anterior;

        mostrarContenidoApp(anterior);

    } else {

        cerrarApp();

    }

}


function cerrarApp() {

    const ventana = document.getElementById("ventanaApp");

    ventana.classList.remove("abierto");

    appActual = null;
    historialApp = [];

}


/* =========================================================
   SISTEMA DE PREGUNTAS
========================================================= */

/*
    La idea del juego es:

    1. El detective recibe una pregunta.
    2. Tiene que investigar el móvil.
    3. Encuentra información.
    4. Vuelve a Investigación.
    5. Responde.
    6. Se desbloquea la siguiente pregunta.

    Las preguntas NO dicen directamente dónde está la respuesta.
*/


const preguntasCaso = [

    {
        numero: 1,

        titulo: "¿Quién es David García?",

        texto:
            "Antes de interpretar las conversaciones y llamadas, necesitas saber qué relación tiene David con Marta.",

        respuestas: [

            "Su exnovio",

            "Su compañero de trabajo",

            "El hermano de Álex",

            "Un organizador de eventos"

        ],

        correcta: 1,

        explicacion:
            "David aparece en los contactos como compañero de trabajo de Marta en Agencia Creativa Norte.",

        pista:
            "Busca a David en Contactos."

    },


    {
        numero: 2,

        titulo: "¿Qué parece estar ocurriendo entre Marta y David?",

        texto:
            "Has visto que Marta mantiene bastante contacto con David. ¿Qué conclusión puedes sacar SOLO con esta información?",

        respuestas: [

            "Está claro que mantienen una relación",

            "Es imposible saberlo todavía",

            "David es el hermano de Álex",

            "Marta trabaja para David"

        ],

        correcta: 1,

        explicacion:
            "Las llamadas y mensajes pueden parecer sospechosos, pero por sí solos no demuestran una relación sentimental.",

        pista:
            "No confundas una sospecha con una prueba."

    },


    {
        numero: 3,

        titulo: "¿Qué relación tiene La Finca Eventos con Marta?",

        texto:
            "Hay varias referencias a este lugar. Averigua qué está haciendo Marta allí.",

        respuestas: [

            "Ha quedado allí con David para una cita",

            "Está trabajando allí",

            "Ha reservado una sala para un evento",

            "Es la casa de David"

        ],

        correcta: 2,

        explicacion:
            "Los correos de La Finca Eventos confirman una reserva para el sábado a las 20:30, con sala privada, 18 personas y menú cerrado.",

        pista:
            "Busca información sobre La Finca Eventos en Mail y Mapas."

    },


    {
        numero: 4,

        titulo: "¿Por qué Marta insiste en que Álex no debe enterarse?",

        texto:
            "Hay varios mensajes donde Marta pide que no le cuenten algo a Álex. ¿Qué explicación encaja mejor con el resto de información?",

        respuestas: [

            "Porque Marta está ocultando una relación",

            "Porque está preparando algo que Álex no debe descubrir",

            "Porque ha cometido un delito",

            "Porque David le ha pedido que mienta"

        ],

        correcta: 1,

        explicacion:
            "Los correos, la reserva, las fotos y las notas indican que Álex es la persona homenajeada y que la información debe mantenerse en secreto.",

        pista:
            "Busca la nota 'COSAS QUE FALTAN' y revisa los correos."

    },


    {
        numero: 5,

        titulo: "¿Qué ocurrió realmente en La Finca Eventos?",

        texto:
            "Une la información que aparece en distintas aplicaciones.",

        respuestas: [

            "Marta tuvo una cena privada con David",

            "Marta organizó una fiesta sorpresa",

            "Marta fue a una reunión de trabajo",

            "Marta se reunió allí con su exnovio"

        ],

        correcta: 1,

        explicacion:
            "La reserva es para 18 personas, hay decoración, tarta, regalo, fotos y mensajes relacionados con mantener la sorpresa.",

        pista:
            "No mires una sola aplicación. Relaciona varias pistas."

    },


    {
        numero: 6,

        titulo: "¿Qué significado tienen las visitas a casa de David?",

        texto:
            "Las visitas pueden parecer sospechosas. Pero una prueba aislada no siempre explica lo ocurrido.",

        respuestas: [

            "Demuestran que Marta y David son pareja",

            "No tienen ninguna importancia",

            "Pueden estar relacionadas con la organización de la sorpresa",

            "Demuestran que David vive con Marta"

        ],

        correcta: 2,

        explicacion:
            "David está ayudando a Marta a organizar la sorpresa. Los mensajes indican que él se encarga de hablar con otras personas y llevar las fotos.",

        pista:
            "Revisa las conversaciones con David y las notas."

    },


    {
        numero: 7,

        titulo: "¿Cuál es la explicación que mejor encaja con todas las pruebas?",

        texto:
            "Es el momento de tomar una decisión. No te fijes en una sola pista: piensa en el conjunto.",

        respuestas: [

            "Marta mantiene una relación con David",

            "Marta está preparando una sorpresa para Álex",

            "Marta oculta un problema laboral",

            "No hay información suficiente para llegar a ninguna conclusión"

        ],

        correcta: 1,

        explicacion:
            "La explicación que mejor encaja con el conjunto de pruebas es que Marta está organizando una fiesta sorpresa para Álex con ayuda de David, Dani y otras personas.",

        pista:
            "Piensa en la reserva para 18 personas, la nota, las fotos y los mensajes."

    }

];


let preguntaActual = 0;

let preguntasRespondidas = 0;

let respuestasCorrectas = 0;

let preguntaContestada = false;


/* =========================================================
   INVESTIGACIÓN
========================================================= */

function mostrarInvestigacion() {

    const contenido = document.getElementById("contenidoApp");

    const pregunta = preguntasCaso[preguntaActual];

    if (!pregunta) {

        mostrarFinalCaso();

        return;
    }


    contenido.innerHTML = `

        <div class="investigacion">

            <div class="investigacion-superior">

                <small>
                    CASO 001
                </small>

                <div class="progreso">
                    ${preguntasRespondidas}/${preguntasCaso.length}
                </div>

            </div>


            <div class="pregunta-numero">
                PREGUNTA ${pregunta.numero}
            </div>


            <h1 class="pregunta-titulo">
                ${pregunta.titulo}
            </h1>


            <p class="pregunta-texto">
                ${pregunta.texto}
            </p>


            <div class="respuestas">

                ${pregunta.respuestas.map((respuesta, indice) => `

                    <button
                        class="respuesta"
                        onclick="responderPregunta(${indice})"
                        ${preguntaContestada ? "disabled" : ""}
                    >
                        ${String.fromCharCode(65 + indice)}.
                        ${respuesta}
                    </button>

                `).join("")}

            </div>


            <button
                class="boton-pista"
                onclick="mostrarPista()"
                ${preguntaContestada ? "disabled" : ""}
            >
                Ver pista
            </button>


            <div id="feedbackPregunta"></div>

        </div>

    `;

}


/* =========================================================
   RESPONDER PREGUNTA
========================================================= */

function responderPregunta(indice) {

    if (preguntaContestada) {
        return;
    }

    const pregunta = preguntasCaso[preguntaActual];

    const botones =
        document.querySelectorAll(".respuesta");

    botones.forEach((boton, i) => {

        boton.disabled = true;

        if (i === pregunta.correcta) {
            boton.classList.add("correcta");
        }

    });


    if (indice !== pregunta.correcta) {

        botones[indice].classList.add("incorrecta");

    } else {

        respuestasCorrectas++;

    }


    preguntasRespondidas++;

    preguntaContestada = true;


    const esCorrecta = indice === pregunta.correcta;


    const feedback =
        document.getElementById("feedbackPregunta");


    feedback.innerHTML = `

        <div class="feedback-pregunta">

            <strong>
                ${esCorrecta ? "Correcto." : "No exactamente."}
            </strong>

            <br><br>

            ${pregunta.explicacion}

        </div>

        <button
            class="boton-siguiente"
            onclick="siguientePregunta()"
        >
            ${preguntaActual === preguntasCaso.length - 1
                ? "VER RESULTADO"
                : "SIGUIENTE PREGUNTA →"}
        </button>

    `;

}


/* =========================================================
   SIGUIENTE PREGUNTA
========================================================= */

function siguientePregunta() {

    preguntaActual++;

    preguntaContestada = false;

    mostrarInvestigacion();

}


/* =========================================================
   PISTA
========================================================= */

function mostrarPista() {

    const pregunta = preguntasCaso[preguntaActual];

    const feedback =
        document.getElementById("feedbackPregunta");


    feedback.innerHTML = `

        <div class="feedback-pregunta">

            <strong>Pista</strong>

            <br><br>

            ${pregunta.pista}

        </div>

    `;

}


/* =========================================================
   RESULTADO FINAL
========================================================= */

function mostrarFinalCaso() {

    const contenido =
        document.getElementById("contenidoApp");


    let porcentaje =
        Math.round(
            (respuestasCorrectas / preguntasCaso.length) * 100
        );


    let mensaje;


    if (porcentaje >= 85) {

        mensaje =
            "Excelente trabajo. Has conseguido reconstruir la historia prácticamente sin equivocarte.";

    } else if (porcentaje >= 60) {

        mensaje =
            "Buen trabajo. Has encontrado la explicación correcta, aunque algunas pistas te han hecho dudar.";

    } else {

        mensaje =
            "Has llegado al final, pero algunas de tus conclusiones no encajaban con todas las pruebas.";

    }


    contenido.innerHTML = `

        <div class="investigacion">

            <div class="pregunta-numero">
                CASO 001 COMPLETADO
            </div>

            <h1 class="pregunta-titulo">
                Investigación terminada
            </h1>

            <p class="pregunta-texto">
                ${mensaje}
            </p>


            <div class="feedback-pregunta">

                <strong>
                    Resultado
                </strong>

                <br><br>

                Respuestas correctas:
                ${respuestasCorrectas}/${preguntasCaso.length}

                <br><br>

                Puntuación:
                ${porcentaje}%

                <br><br>

                Conclusión:
                Marta estaba organizando una fiesta sorpresa para Álex
                con ayuda de David, Dani y otras personas.

            </div>


            <button
                class="boton-siguiente"
                onclick="cerrarApp()"
            >
                VOLVER AL MÓVIL
            </button>

        </div>

    `;

}


/* =========================================================
   MENSAJES
========================================================= */

const conversaciones = {

    "Álex": [

        {
            emisor: "Álex",
            texto: "¿Has llegado bien?",
            hora: "18:32"
        },

        {
            emisor: "Marta",
            texto: "Sí ❤️",
            hora: "18:34"
        },

        {
            emisor: "Álex",
            texto: "Perfecto.",
            hora: "18:35"
        }

    ],


    "David García": [

        {
            emisor: "Marta",
            texto: "¿Has conseguido reservarlo?",
            hora: "21:17"
        },

        {
            emisor: "David",
            texto: "Sí 😭❤️",
            hora: "21:18"
        },

        {
            emisor: "Marta",
            texto: "Pero no le digas absolutamente nada.",
            hora: "21:19"
        },

        {
            emisor: "David",
            texto: "Obviamente 😂",
            hora: "21:19"
        },

        {
            emisor: "Marta",
            texto: "Como se entere Álex antes del sábado me muero.",
            hora: "21:20"
        },

        {
            emisor: "David",
            texto: "Tranquila. Yo me encargo.",
            hora: "21:21"
        },

        {
            emisor: "Marta",
            texto: "¿Está todo confirmado?",
            hora: "20:51"
        },

        {
            emisor: "David",
            texto: "Sí. No te preocupes.",
            hora: "20:53"
        },

        {
            emisor: "David",
            texto: "Ya he hablado con todos.",
            hora: "09:12"
        },

        {
            emisor: "David",
            texto: "Nadie va a decir nada.",
            hora: "09:12"
        }

    ],


    "Dani": [

        {
            emisor: "Marta",
            texto: "¿Entonces vienes?",
            hora: "13:04"
        },

        {
            emisor: "Dani",
            texto: "Sí, pero solo un rato.",
            hora: "13:05"
        },

        {
            emisor: "Marta",
            texto: "Perfecto.",
            hora: "13:05"
        },

        {
            emisor: "Marta",
            texto: "Y por favor no se lo cuentes a Álex.",
            hora: "13:06"
        },

        {
            emisor: "Dani",
            texto: "😂😂",
            hora: "13:07"
        }

    ],


    "Mamá": [

        {
            emisor: "Mamá",
            texto: "¿Vas a venir el domingo?",
            hora: "11:42"
        },

        {
            emisor: "Marta",
            texto: "Sí, creo.",
            hora: "11:45"
        },

        {
            emisor: "Mamá",
            texto: "Vale ❤️",
            hora: "11:46"
        }

    ]

};


function mostrarListaConversaciones() {

    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        <div class="lista-app">

            ${Object.keys(conversaciones).map(nombre => {

                const mensajes =
                    conversaciones[nombre];

                const ultimo =
                    mensajes[mensajes.length - 1];


                return `

                    <div
                        class="elemento-lista"
                        onclick="abrirConversacion('${nombre}')"
                    >

                        <strong>
                            ${nombre}
                        </strong>

                        <small>
                            ${ultimo.texto}
                        </small>

                    </div>

                `;

            }).join("")}

        </div>

    `;

}


function abrirConversacion(nombre) {

    historialApp.push("mensajes");

    const contenido =
        document.getElementById("contenidoApp");

    const mensajes =
        conversaciones[nombre];


    document.getElementById("tituloApp").textContent =
        nombre;


    contenido.innerHTML = `

        <div class="conversaciones">

            ${mensajes.map(mensaje => `

                <div
                    class="mensaje-burbuja
                    ${mensaje.emisor === "Marta"
                        ? "mensaje-marta"
                        : "mensaje-otro"}"
                >

                    ${mensaje.texto}

                    <div class="mensaje-hora">
                        ${mensaje.hora}
                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   CONTACTOS
========================================================= */

const contactos = [

    {
        nombre: "David García",
        numero: "644 381 729",
        info: "Compañero de trabajo",
        empresa: "Agencia Creativa Norte"
    },

    {
        nombre: "Daniel López",
        numero: "611 728 405",
        info: "Hermano de Álex",
        empresa: "Dani"
    },

    {
        nombre: "La Finca Eventos",
        numero: "932 481 620",
        info: "Organización de eventos",
        empresa: "Carrer de la Finca, 24"
    },

    {
        nombre: "Mamá Álex",
        numero: "633 820 114",
        info: "Madre de Álex",
        empresa: ""
    }

];


function mostrarContactos() {

    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        <div class="lista-app">

            ${contactos.map(contacto => `

                <div class="contacto">

                    <div class="contacto-nombre">
                        ${contacto.nombre}
                    </div>

                    <div class="contacto-numero">
                        ${contacto.numero}
                    </div>

                    <div class="contacto-info">
                        ${contacto.info}
                        ${contacto.empresa
                            ? " · " + contacto.empresa
                            : ""}
                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   LLAMADAS
========================================================= */

const llamadas = [

    {
        nombre: "David García",
        dia: "Lunes 20:48",
        duracion: "17 min",
        tipo: "saliente"
    },

    {
        nombre: "David García",
        dia: "Martes 21:12",
        duracion: "24 min",
        tipo: "saliente"
    },

    {
        nombre: "Dani",
        dia: "Miércoles 13:01",
        duracion: "8 min",
        tipo: "saliente"
    },

    {
        nombre: "David García",
        dia: "Miércoles 22:47",
        duracion: "31 min",
        tipo: "saliente"
    },

    {
        nombre: "932 481 620",
        dia: "Jueves 18:54",
        duracion: "3 min",
        tipo: "entrante"
    }

];


function mostrarLlamadas() {

    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        <div class="lista-app">

            ${llamadas.map(llamada => `

                <div class="llamada">

                    <div class="llamada-icono">
                        ☎
                    </div>

                    <div class="llamada-info">

                        <strong>
                            ${llamada.nombre}
                        </strong>

                        <small>
                            ${llamada.tipo === "saliente"
                                ? "Llamada saliente"
                                : "Llamada entrante"}
                            · ${llamada.dia}
                        </small>

                    </div>

                    <div class="llamada-duracion">
                        ${llamada.duracion}
                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   CALENDARIO
========================================================= */

function mostrarCalendario() {

    const contenido =
        document.getElementById("contenidoApp");


    const diasSemana = [
        "L",
        "M",
        "X",
        "J",
        "V",
        "S",
        "D"
    ];


    let html = `

        <div class="calendario">

            <div class="calendario-titulo">
                Marzo 2026
            </div>

            <div class="dias-semana">

                ${diasSemana.map(dia => `
                    <div class="dia-semana">
                        ${dia}
                    </div>
                `).join("")}

            </div>

            <div class="dias-mes">

    `;


    // Marzo de 2026 empieza domingo.
    // Con lunes como primer día, hay 6 espacios.
    for (let i = 0; i < 6; i++) {

        html += `<div></div>`;

    }


    for (let dia = 1; dia <= 31; dia++) {

        let evento = "";


        if (dia === 20) {

            evento = `
                <div class="evento">
                    Reunión
                </div>
            `;

        }


        if (dia === 21) {

            evento = `
                <div class="evento">
                    Cena
                </div>
            `;

        }


        html += `

            <div class="dia">

                <div class="dia-numero">
                    ${dia}
                </div>

                ${evento}

            </div>

        `;

    }


    html += `

            </div>

        </div>

    `;


    contenido.innerHTML = html;

}


/* =========================================================
   FOTOS
========================================================= */

const fotos = [

    {
        archivo: "parque.jpg",
        fechaGrupo: "16 de marzo",
        fecha: "16 de marzo de 2026",
        hora: "17:32",
        ubicacion: "Parque",
        personas: "2 personas",
        descripcion: "Una tarde normal en el parque.",
        nombre: "parque.jpg"
    },

    {
        archivo: "cafe.jpg",
        fechaGrupo: "16 de marzo",
        fecha: "16 de marzo de 2026",
        hora: "18:11",
        ubicacion: "Cafetería Central",
        personas: "2 personas",
        descripcion: "Una foto tomada durante la tarde.",
        nombre: "cafe.jpg"
    },

    {
        archivo: "restaurante.jpg",
        fechaGrupo: "17 de marzo",
        fecha: "17 de marzo de 2026",
        hora: "19:42",
        ubicacion: "La Finca Eventos",
        personas: "2 personas",
        descripcion: "Mesa preparada para una cena.",
        nombre: "restaurante.jpg"
    },

    {
        archivo: "IMG_4821.jpg",
        fechaGrupo: "17 de marzo",
        fecha: "17 de marzo de 2026",
        hora: "19:43",
        ubicacion: "La Finca Eventos",
        personas: "6 personas",
        descripcion: "Varias personas preparando una sala.",
        nombre: "IMG_4821.jpg"
    },

    {
        archivo: "caja.jpg",
        fechaGrupo: "18 de marzo",
        fecha: "18 de marzo de 2026",
        hora: "22:18",
        ubicacion: "Casa",
        personas: "1 persona",
        descripcion: "Una caja con el número 30.",
        nombre: "caja.jpg"
    },

    {
        archivo: "fiesta.jpg",
        fechaGrupo: "19 de marzo",
        fecha: "19 de marzo de 2026",
        hora: "17:31",
        ubicacion: "Casa",
        personas: "1 persona",
        descripcion: "Todo preparado para el sábado.",
        nombre: "fiesta.jpg"
    },

    {
        archivo: "trabajo.jpg",
        fechaGrupo: "18 de marzo",
        fecha: "18 de marzo de 2026",
        hora: "10:14",
        ubicacion: "Agencia Creativa Norte",
        personas: "3 personas",
        descripcion: "Una foto durante la jornada de trabajo.",
        nombre: "trabajo.jpg"
    },

    {
        archivo: "mar.jpg",
        fechaGrupo: "14 de marzo",
        fecha: "14 de marzo de 2026",
        hora: "13:22",
        ubicacion: "Barcelona",
        personas: "0 personas",
        descripcion: "Una fotografía del mar.",
        nombre: "mar.jpg"
    },

    {
        archivo: "vino.jpg",
        fechaGrupo: "12 de marzo",
        fecha: "12 de marzo de 2026",
        hora: "21:09",
        ubicacion: "Restaurante",
        personas: "2 personas",
        descripcion: "Una cena.",
        nombre: "vino.jpg"
    }

];


function mostrarGaleriaFotos() {

    const contenido =
        document.getElementById("contenidoApp");


    const grupos = {};


    fotos.forEach((foto, indice) => {

        if (!grupos[foto.fechaGrupo]) {
            grupos[foto.fechaGrupo] = [];
        }

        grupos[foto.fechaGrupo].push({
            ...foto,
            indice
        });

    });


    let html = `<div class="galeria">`;


    Object.keys(grupos).forEach(fecha => {

        html += `

            <div class="grupo-fotos">

                <div class="fecha-grupo">
                    ${fecha}
                </div>

                <div class="grid-fotos">

        `;


        grupos[fecha].forEach(foto => {

            html += `

                <img
                    src="fotos/${foto.archivo}"
                    class="foto-mini"
                    onclick="mostrarFoto(${foto.indice})"
                >

            `;

        });


        html += `

                </div>

            </div>

        `;

    });


    html += `</div>`;


    contenido.innerHTML = html;

}


function mostrarFoto(indice) {

    const foto = fotos[indice];


    const overlay =
        document.createElement("div");

    overlay.className = "foto-completa";

    overlay.id = "overlayFoto";


    overlay.innerHTML = `

        <div class="foto-controles">

            <button onclick="cerrarFoto()">
                ‹
            </button>

            <button onclick="mostrarInfoFoto(${indice})">
                ⓘ
            </button>

        </div>

        <img
            src="fotos/${foto.archivo}"
            alt="${foto.nombre}"
        >

    `;


    document
        .getElementById("ventanaApp")
        .appendChild(overlay);

}


function cerrarFoto() {

    const overlay =
        document.getElementById("overlayFoto");

    if (overlay) {
        overlay.remove();
    }

}


function mostrarInfoFoto(indice) {

    const foto = fotos[indice];


    let info =
        document.createElement("div");

    info.className = "info-foto";

    info.id = "infoFoto";


    info.innerHTML = `

        <h3>
            Información
        </h3>

        <p>
            <strong>Archivo:</strong>
            ${foto.nombre}
        </p>

        <p>
            <strong>Fecha:</strong>
            ${foto.fecha}
        </p>

        <p>
            <strong>Hora:</strong>
            ${foto.hora}
        </p>

        <p>
            <strong>Ubicación:</strong>
            ${foto.ubicacion}
        </p>

        <p>
            <strong>Personas:</strong>
            ${foto.personas}
        </p>

        <p>
            <strong>Descripción:</strong>
            ${foto.descripcion}
        </p>

    `;


    document
        .getElementById("overlayFoto")
        .appendChild(info);

}


/* =========================================================
   EMAILS
========================================================= */

const emails = [

    {
        remitente: "La Finca Eventos",
        fecha: "Martes 11:36",
        asunto: "Confirmación de reserva",

        cuerpo: `Hola Marta,

Confirmamos la reserva para el sábado a las 20:30.

Sala privada.
18 personas.
Menú cerrado.
Decoración incluida.

Si necesitas modificar algún detalle, puedes responder a este correo.

Un saludo,
La Finca Eventos`,

        adjunto: "📎 Reserva_Álex.pdf"

    },


    {
        remitente: "David García",
        fecha: "Miércoles 09:12",
        asunto: "RE: Sábado",

        cuerpo: `Ya he hablado con todos.

Nadie va a decir nada.

Solo falta llevar las fotos.

Nos vemos allí.`,

        adjunto: "📎 fotos.zip"

    },


    {
        remitente: "La Finca Eventos",
        fecha: "Jueves 16:44",
        asunto: "Importante — sorpresa",

        cuerpo: `Hola Marta,

Te recordamos que la persona homenajeada no debe saber que existe la reserva.

Nos vemos el sábado.

Gracias por confiar en nosotros.`,

        adjunto: null

    },


    {
        remitente: "Agencia Creativa Norte",
        fecha: "Viernes 09:03",
        asunto: "Reunión de equipo",

        cuerpo: `Recordatorio:

Reunión de equipo este viernes a las 18:00.

Un saludo,
Agencia Creativa Norte`,

        adjunto: null

    }

];


function mostrarEmails() {

    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        <div class="lista-app">

            ${emails.map((email, indice) => `

                <div
                    class="email"
                    onclick="abrirEmail(${indice})"
                >

                    <div class="email-remitente">

                        <strong>
                            ${email.remitente}
                        </strong>

                        <span class="email-fecha">
                            ${email.fecha}
                        </span>

                    </div>

                    <div class="email-asunto">
                        ${email.asunto}
                    </div>

                    <div class="email-preview">
                        ${email.cuerpo
                            .replace(/\n/g, " ")
                            .substring(0, 80)}...
                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


function abrirEmail(indice) {

    historialApp.push("mail");


    const email = emails[indice];


    document.getElementById("tituloApp").textContent =
        email.remitente;


    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        <div class="email-detalle">

            <h3>
                ${email.asunto}
            </h3>

            <p>
                ${email.cuerpo}
            </p>

            ${
                email.adjunto
                ?
                `
                    <div class="adjunto">
                        ${email.adjunto}
                    </div>
                `
                :
                ""
            }

        </div>

    `;

}


/* =========================================================
   MAPAS
========================================================= */

const ubicaciones = [

    {
        nombre: "La Finca Eventos",
        dia: "Martes 19:35",
        direccion: "Carrer de la Finca, 24",
        duracion: "48 min",

        lat: 41.3902,
        lng: 2.1540,

        descripcion:
            "Ubicación registrada mientras Marta estaba fuera de casa."
    },


    {
        nombre: "Casa de David García",
        dia: "Miércoles 22:03",
        direccion: "Carrer de la Marina, 87",
        duracion: "1h 12",

        lat: 41.3978,
        lng: 2.1900,

        descripcion:
            "Ubicación registrada durante la noche."
    },


    {
        nombre: "La Finca Eventos",
        dia: "Jueves 17:25",
        direccion: "Carrer de la Finca, 24",
        duracion: "36 min",

        lat: 41.3902,
        lng: 2.1540,

        descripcion:
            "Nueva visita registrada en el mismo lugar."
    }

];


let mapa = null;


function mostrarMapa() {

    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        <div
            id="mapa"
            class="mapa"
        ></div>

        <div class="lista-ubicaciones">

            ${ubicaciones.map((ubicacion, indice) => `

                <div
                    class="ubicacion"
                    onclick="centrarUbicacion(${indice})"
                >

                    <strong>
                        ${ubicacion.nombre}
                    </strong>

                    <small>
                        ${ubicacion.dia}
                        · ${ubicacion.duracion}
                    </small>

                    <p>
                        ${ubicacion.descripcion}
                    </p>

                </div>

            `).join("")}

        </div>

    `;


    setTimeout(() => {

        crearMapa();

    }, 100);

}


function crearMapa() {

    const elemento =
        document.getElementById("mapa");

    if (!elemento) {
        return;
    }


    mapa = L.map("mapa").setView(
        [41.394, 2.172],
        13
    );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(mapa);


    ubicaciones.forEach(ubicacion => {

        L.marker([
            ubicacion.lat,
            ubicacion.lng
        ])
        .addTo(mapa)
        .bindPopup(`
            <strong>
                ${ubicacion.nombre}
            </strong>
            <br>
            ${ubicacion.dia}
        `);

    });

}


function centrarUbicacion(indice) {

    const ubicacion =
        ubicaciones[indice];


    if (!mapa) {
        return;
    }


    mapa.setView(
        [ubicacion.lat, ubicacion.lng],
        16
    );


    L.popup()
        .setLatLng([
            ubicacion.lat,
            ubicacion.lng
        ])
        .setContent(`
            <strong>
                ${ubicacion.nombre}
            </strong>
            <br>
            ${ubicacion.dia}
            <br>
            ${ubicacion.direccion}
        `)
        .openOn(mapa);

}


/* =========================================================
   NOTAS
========================================================= */

const notas = [

    {
        titulo: "Lista de la compra",

        texto:
            "Leche\nPan\nHuevos\nCafé\nFruta"
    },


    {
        titulo: "COSAS QUE FALTAN",

        texto:
            "☐ Fotos de cuando éramos pequeños\n☐ Vídeos\n☐ Tarta\n☐ Decoración\n☐ Regalo\n☐ Confirmar David\n☐ Confirmar Dani\n☐ Que Álex no sospeche"
    },


    {
        titulo: "Ideas para el trabajo",

        texto:
            "Preparar presentación del viernes.\nRevisar propuesta.\nEnviar documentos."
    }

];


function mostrarNotas() {

    const contenido =
        document.getElementById("contenidoApp");


    contenido.innerHTML = `

        ${notas.map(nota => `

            <div class="nota">

                <div class="nota-titulo">
                    ${nota.titulo}
                </div>

                <div class="nota-texto">
                    ${nota.texto}
                </div>

            </div>

        `).join("")}

    `;

}


/* =========================================================
   INICIAR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    mostrarPantalla("inicio");

});