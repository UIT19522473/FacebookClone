import React from "react";

const MessageSend = (props) => {
  const { mess } = props;
  return (
    <div className="wrap-mess-send mb-2">
      <p>{mess}</p>
    </div>
  );
};

export default MessageSend;
