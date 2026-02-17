import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket: Client connected");

  ws.on("message", (message) => {
    const text = message.toString();
    console.log("Websocket Message:", text);

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    }
  });

  ws.on("close", () => {
    console.log("Websocket: Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
