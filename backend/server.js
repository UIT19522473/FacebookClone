const app = require("./src/app");

const http = require("http");

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const chatMessageHandler = require("./src/socket/chatPrivateMess");

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
  // Sử dụng phần xử lý chatMessage từ file riêng
  // chatMessageHandler(socket);

  //callVideo
  socket.on("callVideo", (data) => {
    const { userSend, userReceive, call_id, type } = data;
    //type 0: thông báo cuộc gọi tới người nhận, 1: xác nhận cuộc gọi, 2: từ chối cuộc gọi
    socket.emit(`${userReceive}`, {
      userSend,
      userReceive,
      call_id,
      type
    })
  })

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
