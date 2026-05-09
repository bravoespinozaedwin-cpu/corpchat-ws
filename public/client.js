const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  console.log("Conectado al servidor WebSocket");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log(data.mensaje);
});

socket.addEventListener("close", () => {
  console.log("Desconectado del servidor WebSocket");
});