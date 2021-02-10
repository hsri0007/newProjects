const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let users = [];

io.on("connection", (Socket) => {
  Socket.on("join server", (username) => {
    const body = {
      username,
      id: sock.id,
    };
    users.push(body);
    io.emit("new user", users);
  });

  Socket.on("join room", (roomid, cd) => {
    Socket.join(roomid);
    cd(messages[roomid]);
  });
  Socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    if (isChannel) {
      const payload = {
        content,
        chatName,
        sender,
      };
      Socket.to(to).emit("new message", payload);
    } else {
      const payload = {
        content,
        chatName,
        sender,
      };
      Socket.to(to).emit("new message", payload);
    }
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content,
      });
    }
  });
});

server.listen(5000);
