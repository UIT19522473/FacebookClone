const chatPrivate = (socket, socketIo) => {
  // //join room
  // socket.on("joinRoom", (data) => {
  //   // Tham gia vào phòng của người gửi
  //   socket.join(data?.idRoom);
  // });

  socket.on("chatMessage", (data) => {
    const { userSend, userReceive, message, idRoom } = data;
    console.log("chatMessage", userSend?.name);

    socketIo.to(idRoom).emit(`messageReceived`, {
      userSend: userSend,
      userReceive: userReceive,
      message: message,
    });

    //send notify to room notify
    const idNotifyRoom = `notify_${userReceive._id}`;
    socketIo.to(idNotifyRoom).emit(`notifyReceived`, {
      userSend: userSend,
      type: "CHAT_PRIVATE",
      payload: { mess: `ban co tin nhan tu : ${userSend.name}` },
    });
  });
};

const chatGroup = (socket, socketIo) => {
  socket.on("chatGroupMessage", (data) => {
    const { userSend, idGroupChat, members, message } = data;

    // console.log({ userSend, idGroupChat, members, message });

    members.forEach((member) => {
      const idRoom = `chatGroup_${member._id}`;
      socketIo.to(idRoom).emit(`messageGroupReceived`, {
        userSend: userSend,
        idGroupChat: idGroupChat,
        message: message,
      });

      //send notify to room notify
      const idNotifyRoom = `notify_${member._id}`;
      socketIo.to(idNotifyRoom).emit(`notifyReceived`, {
        idUser: member._id,
        type: "CHAT_GROUP",
        payload: { mess: `ban co tin nhan tu nhom: ${idGroupChat}` },
      });
    });
  });
};

const notifyCreateGroupChat = (socket, socketIo) => {
  socket.on("createGroupChat", (data) => {
    const { idUser, name, members } = data;
    console.log({ idUser, name, members });

    // console.log({ userSend, idGroupChat, members, message });

    members.forEach((member) => {
      //send notify to room notify
      const idNotifyRoom = `notify_${member}`;
      socketIo.to(idNotifyRoom).emit(`notifyReceived`, {
        idUser: idUser,
        type: "CREATE_CHAT_GROUP",
        payload: { mess: `ban vua duoc them vao nhom: ${name}` },
      });
    });
  });
};

module.exports = { chatPrivate, chatGroup, notifyCreateGroupChat };
