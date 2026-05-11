// public/client.js
const socket = new WebSocket("ws://localhost:3000");

const chatDiv = document.getElementById("chat");
const entrada = document.getElementById("entrada");
const botonEnviar = document.getElementById("enviar");

// Pinta un mensaje de chat normal (HU-04 / HU-05)
function pintarMensaje(data) {
  const div = document.createElement("div");
  div.classList.add("mensaje");
  const hora = data.hora ? `[${data.hora}] ` : "";
  div.textContent = `${hora}${data.user}: ${data.message}`;
  chatDiv.appendChild(div);
}

// Pinta un mensaje del sistema (HU-06)
function pintarSistema(texto) {
  const div = document.createElement("div");
  div.classList.add("sistema");
  div.textContent = texto;
  chatDiv.appendChild(div);
}

// Cuando llega un mensaje del servidor
socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.tipo === "historial") {
      // HU-05: pintamos todos los mensajes previos antes de los nuevos
      data.mensajes.forEach(pintarMensaje);
      // separador visual para distinguir lo viejo de lo nuevo
      const sep = document.createElement("div");
      sep.classList.add("separador");
      sep.textContent = "— mensajes anteriores —";
      chatDiv.appendChild(sep);
    } else if (data.tipo === "sistema") {
      pintarSistema(data.mensaje);
    } else if (data.tipo === "mensaje") {
      pintarMensaje(data);
    }
  } catch (e) {
    console.error("Error al procesar mensaje:", e);
  }

  // mantener el scroll abajo para ver lo más reciente
  chatDiv.scrollTop = chatDiv.scrollHeight;
};

// Envío de mensaje (soporte HU-03, necesario para probar HU-05)
function enviarMensaje() {
  const texto = entrada.value.trim();
  if (!texto) return;
  socket.send(JSON.stringify({ message: texto }));
  entrada.value = "";
}

botonEnviar.addEventListener("click", enviarMensaje);
entrada.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviarMensaje();
});

socket.onopen = () => console.log("Conectado al WebSocket");