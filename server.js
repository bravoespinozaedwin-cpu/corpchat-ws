// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.static("public"));
let contadorUsuarios = 1;
wss.on("connection", (ws) => {
  console.log("Nuevo usuario conectado");
  ws.send(
    JSON.stringify({
      tipo: "sistema",
      mensaje: "Conectado correctamente al chat",
    }),
  );
  // le ponemos un nombre temporal al usuario para identificarlo en avisos
  ws.nombreUsuario = `Usuario_${contadorUsuarios++}`;

  // avisamos a todos los demas que entro alguien nuevo
  broadcast(
    {
      tipo: "sistema",
      mensaje: `${ws.nombreUsuario} se ha unido al chat`,
    },
    ws,
  );

  ws.on("close", () => {
    console.log("Usuario desconectado");
    // avisamos a los que quedan que alguien salio
    broadcast({
      tipo: "sistema",
      mensaje: `${ws.nombreUsuario} salió del chat`,
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
