// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

let contadorUsuarios = 1;

// HU-05: historial de mensajes en memoria
const HISTORIAL_MAX = 100;
const historial = [];

function horaActual() {
  const ahora = new Date();
  const hh = String(ahora.getHours()).padStart(2, "0");
  const mm = String(ahora.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

wss.on("connection", (ws) => {
  console.log("Nuevo usuario conectado");

  // le ponemos un nombre temporal al usuario para identificarlo
  ws.nombreUsuario = `Usuario_${contadorUsuarios++}`;

  // HU-05: enviar historial al nuevo cliente apenas se conecta
  if (historial.length > 0) {
    ws.send(
      JSON.stringify({
        tipo: "historial",
        mensajes: historial,
      }),
    );
  }

  // mensaje de bienvenida personal
  ws.send(
    JSON.stringify({
      tipo: "sistema",
      mensaje: `[${horaActual()}] Conectado como ${ws.nombreUsuario}`,
    }),
  );

  // avisamos a los demás que entró alguien nuevo
  broadcast(
    {
      tipo: "sistema",
      mensaje: `[${horaActual()}] ${ws.nombreUsuario} se ha unido al chat`,
    },
    ws,
  );

  // recibir mensajes de chat (soporte para HU-03/HU-04, necesario para probar HU-05)
  ws.on("message", (data) => {
    try {
      const entrada = JSON.parse(data);
      const mensajeChat = {
        tipo: "mensaje",
        user: ws.nombreUsuario,
        message: entrada.message,
        hora: horaActual(),
      };

      // HU-05: guardamos en historial (con tope para no inflar la memoria)
      historial.push(mensajeChat);
      if (historial.length > HISTORIAL_MAX) historial.shift();

      // reenviamos a todos
      broadcast(mensajeChat);
    } catch (e) {
      console.error("Error procesando mensaje:", e);
    }
  });

  ws.on("close", () => {
    console.log("Usuario desconectado");
    broadcast({
      tipo: "sistema",
      mensaje: `[${horaActual()}] ${ws.nombreUsuario} salió del chat`,
    });
  });
});

// manda un objeto a todos los clientes conectados
function broadcast(data, excluir = null) {
  const json = JSON.stringify(data);
  wss.clients.forEach((cliente) => {
    if (cliente.readyState === 1 && cliente !== excluir) {
      cliente.send(json);
    }
  });
}

server.listen(3000, () => {
  console.log("Servidor activo en http://localhost:3000");
});