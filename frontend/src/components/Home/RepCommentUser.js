import React from "react";
import "../../styles/home/postcard.css";
import IconFacebook from "../../images/facebook.svg";

const RepCommentUser = () => {
  return (
    <li className="flex items-center gap-1">
      <img className="w-10 h-10" src={IconFacebook} alt="logo" />
      <div className="wrap-comment-user">
        <p className="text-white">Tuan nguyen</p>
        <p className="text-white font-normal text-sm">dep wa love love</p>
      </div>
    </li>
  );
};

export default RepCommentUser;
