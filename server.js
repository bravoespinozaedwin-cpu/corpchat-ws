const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

const clientes = new Map();

function generarUsuario() {
  return "Usuario_" + Math.floor(Math.random() * 1000);
}

function enviarATodos(data) {
  const mensaje = JSON.stringify(data);

  wss.clients.forEach((cliente) => {
    if (cliente.readyState === WebSocket.OPEN) {
      cliente.send(mensaje);
    }
  });
}

wss.on("connection", (ws) => {
  const usuario = generarUsuario();
  clientes.set(ws, usuario);

  console.log(`${usuario} se conectó`);

  ws.send(JSON.stringify({
    tipo: "sistema",
    mensaje: `Te conectaste como ${usuario}`
  }));

  enviarATodos({
    tipo: "sistema",
    mensaje: `${usuario} se unió al chat`
  });

 ws.on("message", (message) => {
  const data = JSON.parse(message.toString());

  if (data.tipo === "cambiar_nombre") {
    const nombreAnterior = clientes.get(ws);
    const nuevoNombre = data.nombre.trim();

    if (nuevoNombre !== "") {
      clientes.set(ws, nuevoNombre);

      enviarATodos({
        tipo: "sistema",
        mensaje: `${nombreAnterior} ahora se llama ${nuevoNombre}`
      });
    }

    return;
  }

  if (data.tipo === "mensaje") {
    const usuario = clientes.get(ws);
    const texto = data.mensaje.trim();

    if (texto !== "") {
      enviarATodos({
        tipo: "mensaje",
        usuario: usuario,
        mensaje: texto,
        hora: new Date().toLocaleTimeString()
      });
    }
  }
});

  ws.on("close", () => {
    console.log(`${usuario} se desconectó`);

    clientes.delete(ws);

    enviarATodos({
      tipo: "sistema",
      mensaje: `${usuario} salió del chat`
    });
  });
});

server.listen(3000, () => {
  console.log("Servidor activo en http://localhost:3000");
});