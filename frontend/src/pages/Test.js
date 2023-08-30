import React, { useState } from "react";

const Con = (props) => {
  const { idP, idAuth, name, comment, handleReply } = props;

  return (
    <div
      onClick={handleReply({ idAuth, name })}
      className="ml-6 mt-2 bg-gray-600 flex gap-2"
    >
      <p>idP: {idP}</p>
      <p>idAuth: {idAuth}</p> name = "A"
      <p>name: {name}</p>
      <p>{comment}</p>
    </div>
  );
};

const Test = () => {
  //reply
  const [idAuth, setIdAuth] = useState("");
  const [name, setName] = useState("");
  const handleReply = (data) => {
    setIdAuth(data.idAuth);
    setName(data.name);
  };
  return (
    <div className="text-white">
      <div>
        <span className="flex gap-2">
          <p>id: 1</p>
          <p>cha</p>
        </span>

        <Con
          handleReply={handleReply}
          idP="1"
          idAuth="1"
          name="A"
          comment="balbal"
        />
        <Con
          handleReply={handleReply}
          idP="1"
          idAuth="2"
          name="B"
          comment="balbal"
        />
        <Con
          handleReply={handleReply}
          idP="1"
          idAuth="3"
          name="C"
          comment="balbal"
        />
        <Con
          handleReply={handleReply}
          idP="1"
          idAuth="4"
          name="D"
          comment="demo o day ne"
        />
      </div>

      <h1>{idAuth}</h1>
      <h1>{name}</h1>
    </div>
  );
};

export default Test;
