import React from "react";
import "../../styles/home/postcard.css";
import IconFacebook from "../../images/facebook.svg";
// import RepCommentUser from "./RepCommentUser";
// import { Link } from "react-router-dom";

const CommentUser = () => {
  return (
    <li className="comment-user flex items-center gap-1">
      <img className="w-10 h-10" src={IconFacebook} alt="logo" />
      <div className="comemnt-user-title">
        <div className="wrap-comment-user">
          <p className="text-white">Tuan nguyen</p>
          <p className="text-white font-normal text-sm">dep wa love love</p>
        </div>
        <div className="wrap-comment-user-controller flex items-center gap-3">
          <p className="font-normal">5 gio</p>
          <button className="btn-user-controller">Thich</button>
          <button className="btn-user-controller">Phan hoi</button>
        </div>
      </div>
    </li>
  );
};

export default CommentUser;
