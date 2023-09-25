const inviteCall = (socket, socketIo) => {
  // //join room
  // socket.on("joinRoom", (data) => {
  //   // Tham gia vào phòng của người gửi
  //   socket.join(data?.idRoom);
  // });

  socket.on("inviteCall", (data) => {
    const { userSend, userReceive, meetingId, idRoom, type } = data;
    console.log("inviteCall", {
      userSend,
      userReceive,
      meetingId,
      idRoom,
      type,
    });

    socketIo.to(idRoom).emit(`inviteCallReceived`, {
      userSend: userSend,
      userReceive: userReceive,
      meetingId: meetingId,
      type: type,
    });

    //send notify to room notify
    const idNotifyRoom = `notify_${userReceive._id}`;
    socketIo.to(idNotifyRoom).emit(`notifyReceived`, {
      userSend: userSend,
      type: "CALL",
      payload: { mess: `ban co cuoc goi tu tu : ${userSend.name}` },
    });
  });
};

const acceptCall = (socket, socketIo) => {
  // //join room
  // socket.on("joinRoom", (data) => {
  //   // Tham gia vào phòng của người gửi
  //   socket.join(data?.idRoom);
  // });

  socket.on("acceptCall", (data) => {
    const { userSend, userReceive, meetingId, idRoom, accept } = data;
    //accept = true if user agree call from another user
    console.log("acceptCall", {
      userSend,
      userReceive,
      meetingId,
      idRoom,
      accept,
    });

    socketIo.to(idRoom).emit(`acceptCallReceived`, {
      userSend: userSend,
      userReceive: userReceive,
      meetingId: meetingId,
      accept: accept,
    });

    //send notify to room notify
    const idNotifyRoom = `notify_${userReceive._id}`;
    socketIo.to(idNotifyRoom).emit(`notifyReceived`, {
      userSend: userSend,
      type: "ACCEPT_CALL",
      payload: { mess: `ban co cuoc goi tu tu : ${userSend.name}` },
    });
  });
};

module.exports = { inviteCall, acceptCall };
