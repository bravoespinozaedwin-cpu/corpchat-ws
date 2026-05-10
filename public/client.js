// Conexión al servidor WebSocket
const socket = new WebSocket("ws://localhost:3000");

// Contenedor de mensajes
const chatDiv = document.getElementById("chat");

// Cuando llega un mensaje desde el servidor
socket.onmessage = (event) => {
    let mensajeMostrado;

    try {
        // Si el mensaje viene como JSON
        const data = JSON.parse(event.data);
        mensajeMostrado = `${data.user}: ${data.message}`;
    } catch (error) {
        // Si el mensaje es texto plano
        mensajeMostrado = event.data;
    }

    const mensajeElemento = document.createElement("div");
    mensajeElemento.textContent = mensajeMostrado;

    chatDiv.appendChild(mensajeElemento);

    // Scroll automático hacia abajo
    chatDiv.scrollTop = chatDiv.scrollHeight;
};

// Mensaje de conexión (opcional, no afecta HU)
socket.onopen = () => {
    console.log("Conectado al WebSocket");
};