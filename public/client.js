// public/client.js

// Conexión al servidor WebSocket
const socket = new WebSocket("ws://localhost:3000");

// Contenedor de mensajes
const chatDiv = document.getElementById("chat");

// Cuando llega un mensaje desde el servidor
socket.onmessage = (event) => {
  const mensajeElemento = document.createElement("div");

  try {
    const data = JSON.parse(event.data);

    // si es notificacion del sistema la pintamos distinto - HU-06
    if (data.tipo === "sistema") {
      mensajeElemento.textContent = data.mensaje;
      mensajeElemento.classList.add("sistema");
    } else {
      // mensaje normal de chat (lo manejara el resto del equipo)
      mensajeElemento.textContent = `${data.user}: ${data.message}`;
    }
  } catch (error) {
    mensajeElemento.textContent = event.data;
  }

  chatDiv.appendChild(mensajeElemento);
  chatDiv.scrollTop = chatDiv.scrollHeight;
};

// Mensaje de conexión (opcional, no afecta HU)
socket.onopen = () => {
  console.log("Conectado al WebSocket");
};
