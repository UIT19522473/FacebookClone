const chatMessageHandler = require("./Chat");

const socketServer = (server) => {
  const socketIo = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  socketIo.on("connection", (socket) => {
    //sub socket
    chatMessageHandler.chatPrivate(socket, socketIo);

    //sub socket ends here....
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketServer;
