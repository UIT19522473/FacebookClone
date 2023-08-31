import React, { useState } from "react";
import "../../styles/home/postcard.css";
import IconFacebook from "../../images/facebook.svg";

import { useSelector } from "react-redux";

const CommentUser = (props) => {
  const auth = useSelector((state) => state.auth?.data);
  const [openWrite, setOpenWrite] = useState(false);
  const { author, content, replies } = props;
  return (
    <div className="mt-2">
      <li className="comment-user flex items-center gap-1">
        <img className="w-10 h-10" src={IconFacebook} alt="logo" />
        <div className="comemnt-user-title">
          <div className="wrap-comment-user">
            <p className="text-white">Tuan nguyen</p>
            <p className="text-white font-normal text-sm">dep wa love love</p>
          </div>
          <div className="wrap-comment-user-controller flex items-center gap-3">
            <p className="font-normal">5 gio</p>
            <button className="btn-user-controller">Thích</button>
            <button
              onClick={() => setOpenWrite(!openWrite)}
              className="btn-user-controller"
            >
              Phản hồi
            </button>
          </div>
        </div>
      </li>
      {replies ? (
        <ul className="comment-list ml-10 mt-2">
          {replies.map((reply, index) => (
            <li key={index}>
              <CommentUser
                author={reply?.author}
                content={reply?.content}
                replies={[]}
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      {openWrite ? (
        <div className="flex items-center comment-user-write mt-3 gap-1">
          <img className="w-8 rounded-full" src={auth?.user?.img} alt="" />
          <span className="flex items-center gap-1 comment-user-write-input w-full">
            <p className="bg-blue-900 text-white px-1">name auth posted</p>
            <input
              className="bg-transparent border-none outline-none flex-1 break-words"
              type="text"
            />
            <button className="ml-auto flex items-center comment-user-write-btn-send">
              <span className="material-symbols-outlined text-lg font-bold">
                send
              </span>
            </button>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentUser;
