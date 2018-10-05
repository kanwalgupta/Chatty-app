const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");
const WebSocket = require("ws");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );
// Create the WebSockets server
const wss = new SocketServer({ server });
wss.broadcast = message => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  console.log("size is ", wss.clients.size);
  let outgoingMessage = {
    type: "onlineUsersUpdate",
    content: wss.clients.size,
  };
  // wss.clients.forEach(function each(client) {
  //   if (client.readyState === WebSocket.OPEN) {
  //     console.log("sending users");
  //     client.send(JSON.stringify(outgoingMessage));
  //     }
  //   });
  wss.broadcast(outgoingMessage);
  ws.on("message", function(message) {
    let incomingMessage = JSON.parse(message);
    let outgoingMessage;
    switch (incomingMessage.type) {
      case "postMessage":
        outgoingMessage = {
          type: "incomingMessage",
          id: uuidv1(),
          username: incomingMessage.username,
          content: incomingMessage.content,
          color: incomingMessage.color
        };
        break;

      case "postNotification":
        outgoingMessage = {
          type: "incomingNotification",
          id: uuidv1(),
          username: incomingMessage.username,
          content: incomingMessage.content
        };

        break;
    }
    console.log("Outgoing message",outgoingMessage);
    wss.broadcast(outgoingMessage);
    // console.log("clients",wss.clients.length);
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(outgoingMessage));
    //     }
    //   });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
    let outgoingMessage = {
      type: "onlineUsersUpdate",
      content: wss.clients.size
    };
   wss.broadcast(outgoingMessage);
  });
});
