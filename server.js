const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {

    let usuario = socket.handshake.auth.usuario;

    if (!usuario || usuario.trim() === '') {

        const numero = Math.floor(Math.random() * 1000);
        usuario = `Usuario_${numero}`;

    }

    socket.usuario = usuario;

    console.log(usuario + ' conectado');

    io.emit('mensaje', {
        usuario: 'Sistema',
        texto: `${usuario} se unió al chat`
    });

    socket.on('mensaje', (msg) => {

        io.emit('mensaje', {
            usuario: usuario,
            texto: msg
        });

    });

    socket.on('disconnect', () => {

        io.emit('mensaje', {
            usuario: 'Sistema',
            texto: `${usuario} salió del chat`
        });

    });

});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});