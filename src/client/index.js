import "./index.html";

import { Elm } from "../Main.elm";

const app = Elm.Main.init({
  node: document.querySelector("#root"),
});

// Create your WebSocket.
const socket = io();

// When a command goes to the `sendMessage` port, we pass the message
// along to the WebSocket.
app.ports.sendMessage.subscribe(function (message) {
  socket.emit("chat message", message);
});

// When a message comes into our WebSocket, we pass the message along
// to the `messageReceiver` port.
socket.addEventListener("message", function (event) {
  app.ports.messageReceiver.send(event.data);
});
