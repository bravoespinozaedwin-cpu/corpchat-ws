const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

console.log('Servidor WebSocket iniciado');

wss.on('connection', (ws) => {

    console.log('Cliente conectado');

    ws.on('message', (data) => {

        const mensaje = JSON.parse(data);

        // Registro de usuario
        if (mensaje.tipo === 'usuario') {

            let nombre = mensaje.nombre;

            if (!nombre || nombre.trim() === '') {

                const numero = Math.floor(Math.random() * 1000);

                nombre = `Usuario_${numero}`;

            }

            ws.usuario = nombre;

            console.log('Usuario:', ws.usuario);

        }

        // Mensajes de chat
        if (mensaje.tipo === 'mensaje') {

            wss.clients.forEach((cliente) => {

                if (cliente.readyState === WebSocket.OPEN) {

                    cliente.send(JSON.stringify({
                        usuario: ws.usuario,
                        texto: mensaje.texto
                    }));

                }

            });

        }

    });

});