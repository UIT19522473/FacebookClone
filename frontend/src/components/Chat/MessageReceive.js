import React from "react";
import FacebookIcon from "../../images/facebook.svg";

const MessageReceive = () => {
  return (
    <div className="wrap-mess-receive">
      <img className="w-8 h-8 rounded-full" src={FacebookIcon} alt="logo" />
      <p className="mess-receive-text">Chào bro</p>
    </div>
  );
};

export default MessageReceive;
