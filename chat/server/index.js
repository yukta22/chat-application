import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let UserList = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("new_user", (user) => {
    UserList.push({ socketId: socket.id, username: user });
    console.log(UserList);
    io.emit("welcome", UserList);
  });
  socket.on("send_message", (data) => {
    // console.log(UserList);
    // console.log(data.receiver.username);
    const receiver = UserList.find((e) => e.username == data.receiver.username);
    console.log(receiver, "e");
    if (receiver) {
      io.to(receiver.socketId).emit("message", {
        sender: data.sender,
        message: data.message,
      });
    }
  });
  socket.on("disconnect", () => {
    UserList = [...UserList.filter((e) => e.socketId != socket.id)];
    io.emit("userDisconnect", UserList);
    console.log(UserList);
  });
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
