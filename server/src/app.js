const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { spawnData, getData } = require("./data");
const { setupIntervalDataUpdates } = require('./updates');

const PORT = 8080;

const app = express();

spawnData();

const server = http.createServer(app);

const IOServer = socketIO(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

IOServer.on("connection", (socket) => {
  socket.emit("initialData", getData());

  setupIntervalDataUpdates(socket);
});

server.listen(PORT, () => console.log("server is running"));
