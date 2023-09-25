const joinRoom = (socket) => {
  //rooms
  const chatPrivate = `chatPrivate_`;
  const chatGroup = `chatGroup_`;
  const call = `call_`;
  const notify = `notify_`;
  const arrRooms = [chatPrivate, chatGroup, call, notify];
  //join room
  socket.on("joinRoom", (data) => {
    // Tham gia vào phòng hien co cua user
    socket.join(data?.idRoom);
    const { idUser } = data;
    arrRooms.forEach((room) => {
      socket.join(room + idUser);
    });
  });
};

module.exports = { joinRoom };
