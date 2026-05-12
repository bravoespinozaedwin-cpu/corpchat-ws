const protocolo = window.location.protocol === "https:" ? "wss" : "ws";
const socket = new WebSocket(`${protocolo}://${window.location.host}`);

const mensajes = document.getElementById("mensajes");
const formulario = document.getElementById("formulario");
const mensajeInput = document.getElementById("mensajeInput");
const nombreInput = document.getElementById("nombreInput");
const cambiarNombreBtn = document.getElementById("cambiarNombreBtn");

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
    socket.send(JSON.stringify({
      tipo: "mensaje",
      mensaje: texto
    }));

    mensajeInput.value = "";
  }
});

cambiarNombreBtn.addEventListener("click", () => {
  const nuevoNombre = nombreInput.value.trim();

  if (nuevoNombre !== "") {
    socket.send(JSON.stringify({
      tipo: "cambiar_nombre",
      nombre: nuevoNombre
    }));

    nombreInput.value = "";
  }
});