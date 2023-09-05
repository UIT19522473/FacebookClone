import React from "react";
import "../../styles/chat.css";
import IconFacebook from "../../images/facebook.svg";
import ChatBox from "./ChatBox";

const WrapChat = () => {
  return (
    <div className="chat-container">
      <div className="row-chat">
        <ChatBox />
        {/* <ChatBox />
        <ChatBox /> */}
      </div>
      <div className="column-chat">
        <div className="">
          <img src={IconFacebook} alt="logo" />
        </div>
        <div className="">
          <img src={IconFacebook} alt="logo" />
        </div>
        <div className="">
          <img src={IconFacebook} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default WrapChat;
