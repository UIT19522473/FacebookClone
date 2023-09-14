import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_URL_SERVER);
// import { useSelector } from "react-redux";

// const Con = (props) => {
//   const { idP, idAuth, name, comment, handleReply } = props;

//   return (
//     <div
//       onClick={handleReply({ idAuth, name })}
//       className="ml-6 mt-2 bg-gray-600 flex gap-2"
//     >
//       <p>idP: {idP}</p>
//       <p>idAuth: {idAuth}</p> name = "A"
//       <p>name: {name}</p>
//       <p>{comment}</p>
//     </div>
//   );
// };

const Test = () => {
  // const auth = useSelector((state) => state.auth?.data?.user);
  // //reply
  // const [idAuth, setIdAuth] = useState("");
  // const [name, setName] = useState("");
  // const handleReply = (data) => {
  //   setIdAuth(data.idAuth);
  //   setName(data.name);
  // };
  const auth = useSelector((state) => state.auth?.data?.user);

  const [fileUrl, setFileUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // const imageURL = URL.createObjectURL(file);

      // setImageURL(imageURL);
      // setImgURLLocal(file);

      setFileUrl(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("img", fileUrl);
    formData.append("desc", "bal bla");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_SERVER_API}/post`,
        formData,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVmMzczNmFiZmMwYzAxNjhkMGY4YzQiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjkzNDY2NzE3LCJleHAiOjE2OTM2Mzk1MTd9.5Zoisl_dxc0OpiA-XJ8ydyTdk5fj7CqWC5Y_hU-almM",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [idRoom, setIdRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", {
      idRoom: `chatPrivate_${auth?._id}`,
    });
    socket.on("messageReceived", (data) => {
      setMessages([...messages, data?.message]);
    });
  }, [auth?._id, messages]);

  const sendMessage = () => {
    socket.emit("chatMessage", {
      message: message,
      idRoom: `chatPrivate_${idRoom}`,
    });
    setMessage("");
  };

  return (
    <div className="text-white">
      <input onChange={handleImageChange} type="file" />
      <button onClick={handleUpload}>upload</button>

      <h1>chat....</h1>
      <div className="ml-96">
        <h2>Chat App</h2>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className="message text-white">
              {msg}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            className="text-black mb-2"
            type="text"
            placeholder="number room"
            value={idRoom}
            onChange={(e) => setIdRoom(e.target.value)}
          />
          <input
            className="text-black"
            type="text"
            placeholder="Nhập tin nhắn"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
