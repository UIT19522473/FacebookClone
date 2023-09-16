const app = require("./src/app");

const http = require("http");

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  //join room
  socket.on("joinRoom", (data) => {
    // Tham gia vào phòng của người gửi
    socket.join(data?.idRoom);
  });

  socket.on("chatMessage", (data) => {
    const { userSend, userReceive, message, idRoom } = data;
    // console.log("one more time");

    socketIo.to(idRoom).emit(`messageReceived`, {
      userSend: userSend,
      userReceive: userReceive,
      message: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 4000;

// const server = app.listen(PORT, () => {
//   console.log(`listening port: ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
