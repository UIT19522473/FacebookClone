import React from "react";
// import FacebookIcon from "../../images/facebook.svg";

const MessageReceive = (props) => {
  const { mess, user } = props;
  return (
    <div className="wrap-mess-receive mb-2">
      <img className="w-8 h-8 rounded-full" src={user?.img} alt="logo" />
      <p className="mess-receive-text">{mess}</p>
    </div>
  );
};

export default MessageReceive;
