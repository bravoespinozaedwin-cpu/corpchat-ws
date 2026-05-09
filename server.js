const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

wss.on("connection", (ws) => {
  console.log("Nuevo usuario conectado");

  ws.send(JSON.stringify({
    tipo: "sistema",
    mensaje: "Conectado correctamente al chat"
  }));

  ws.on("close", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(3000, () => {
  console.log("Servidor activo en http://localhost:3000");
});