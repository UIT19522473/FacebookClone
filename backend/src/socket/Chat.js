const chatPrivate = (socket, socketIo) => {
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
};

const chatGroup = (socket, socketIo) => {
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
};

module.exports = { chatPrivate, chatGroup };
