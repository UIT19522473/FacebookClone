module.exports = (socketIo) => {
  socketIo.on("chatMessage", (data) => {
    const { userSend, userReceive, message, idRoom } = data;

    socketIo.to(idRoom).emit(`messageReceived`, {
      userSend: userSend,
      userReceive: userReceive,
      message: message,
    });
  });
};
