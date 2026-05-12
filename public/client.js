const socket = new WebSocket("ws://localhost:3000");

const mensajes = document.getElementById("mensajes");
const formulario = document.getElementById("formulario");
const mensajeInput = document.getElementById("mensajeInput");

function agregarMensaje(data) {
  const elemento = document.createElement("div");

  if (data.tipo === "sistema") {
    elemento.classList.add("sistema");
    elemento.textContent = data.mensaje;
  }

  if (data.tipo === "mensaje") {
    elemento.classList.add("mensaje");
    elemento.innerHTML = `
      <strong>${data.usuario}</strong>
      <span class="hora">${data.hora}</span>
      <br>
      ${data.mensaje}
    `;
  }

  mensajes.appendChild(elemento);
  mensajes.scrollTop = mensajes.scrollHeight;
}

socket.addEventListener("open", () => {
  console.log("Conectado al servidor WebSocket");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  agregarMensaje(data);
});

socket.addEventListener("close", () => {
  agregarMensaje({
    tipo: "sistema",
    mensaje: "Conexión cerrada con el servidor"
  });
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const texto = mensajeInput.value.trim();

  if (texto !== "") {
    socket.send(texto);
    mensajeInput.value = "";
  }
});
