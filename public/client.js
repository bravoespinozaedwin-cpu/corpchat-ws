// Conexión 
const socket = new WebSocket("ws://localhost:3000");

// Contenedor de mensajes
const chatDiv = document.getElementById("chat");

// Mostrar mensajes 
socket.onmessage = (event) => {
    let mensajeMostrado;

    try {
        const data = JSON.parse(event.data);
        mensajeMostrado = `${data.user || data.usuario}: ${data.message || data.texto}`;
    } catch (error) {
        mensajeMostrado = event.data;
    }

    const mensajeElemento = document.createElement("div");
    mensajeElemento.textContent = mensajeMostrado;

    chatDiv.appendChild(mensajeElemento);
    chatDiv.scrollTop = chatDiv.scrollHeight;
};

// Conexión
socket.onopen = () => {
    console.log("Conectado al WebSocket");
};

function enviarMensaje() {
    const input = document.getElementById("mensaje");
    const mensaje = input.value;

    if (mensaje.trim() !== "") {

        const data = {
            mensaje: mensaje
        };

        socket.send(JSON.stringify(data)); // envío correcto
        input.value = "";
    }
}

// Enter para enviar
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("mensaje");

    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                enviarMensaje();
            }
        });
    }
});