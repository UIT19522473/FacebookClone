const chatMessageHandler = require("./Chat");
const roomHandler = require("./Room");
const callHandler = require("./Call");

const socketServer = (server) => {
  const socketIo = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  socketIo.on("connection", (socket) => {
    //room
    roomHandler.joinRoom(socket);

    //sub socket

    chatMessageHandler.chatPrivate(socket, socketIo);
    chatMessageHandler.chatGroup(socket, socketIo);
    callHandler.inviteCall(socket, socketIo);
    callHandler.acceptCall(socket, socketIo);

    chatMessageHandler.notifyCreateGroupChat(socket, socketIo);

    //sub socket ends here....
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketServer;
