# CorpChat WS

Sistema de chat colaborativo en tiempo real desarrollado con WebSocket.

## Descripción

CorpChat WS permite la comunicación simultánea entre varios usuarios conectados desde una aplicación web. El sistema utiliza WebSocket para mantener una conexión bidireccional persistente entre cliente y servidor, evitando el uso de polling o long-polling.

## Tecnologías utilizadas

- Node.js
- Express
- WebSocket con la librería ws
- HTML
- CSS
- JavaScript
- Git y GitHub
- Notion para gestión Scrum
- ngrok

## Funcionalidades

- Conexión automática al chat.
- Asignación automática de nombre temporal tipo Usuario_123.
- cambiar nombre
- Envío de mensajes en tiempo real.
- Recepción instantánea de mensajes.
- Historial visible de mensajes.
- Notificación cuando un usuario entra al chat.
- Notificación cuando un usuario sale del chat.
## Alcance del prototipo

Este proyecto implementa una funcionalidad básica de chat colaborativo en tiempo real mediante WebSocket. No incluye autenticación IAM ni base de datos, ya que el alcance de esta actividad se enfoca en la comunicación bidireccional persistente entre cliente y servidor.

Como mejora adicional, el sistema permite cambiar el nombre temporal asignado automáticamente y puede ser expuesto mediante ngrok para pruebas desde distintos dispositivos.
## Pruebas realizadas

- Prueba con múltiples pestañas del navegador.
- Prueba de envío y recepción de mensajes en tiempo real.
- Prueba de asignación automática de usuario temporal.
- Prueba de cambio opcional de nombre.
- Prueba de notificación de ingreso y salida de usuarios.
- Prueba de acceso remoto mediante ngrok.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/bravoespinozaedwin-cpu/corpchat-ws.git

instalar ngrok

## comandos para iniciar
en terminal de ngrok
ngrok http 3000  /para poder entrar desde distintos dispositivos

en el develop git bash
 node server.js //