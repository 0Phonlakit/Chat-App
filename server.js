import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));

io.on("connection", function(socket) {
    socket.on("newuser", function(username) {
        socket.broadcast.emit("update", username + " Join the conversation");
    });
    socket.on("exituser", function(username) {
        socket.broadcast.emit("update", username + " Left the conversation");
    });
    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });
});

httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });