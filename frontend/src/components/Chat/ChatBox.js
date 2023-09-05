import React from "react";
import "../../styles/chat.css";
import FacebookIcon from "../../images/facebook.svg";
import { MdCall, MdClose } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
// import { GrSubtract } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import MessageReceive from "./MessageReceive";
import MessageSend from "./MessageSend";

const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-box-header flex items-center justify-between">
        <span className="chat-box-info flex items-center gap-1">
          <img
            className="w-10 h-10 rounded-full"
            src={FacebookIcon}
            alt="icon"
          />
          <div className="chat-box-infor-user">
            <p className="chat-box-infor-user-name text-sm font-semibold">
              Tuân Nguyễn
            </p>
            <p className="chat-box-infor-user-status text-xs">Đang hoạt động</p>
          </div>
        </span>
        <span className="chat-box-controller flex items-center gap-2">
          <button className="chat-box-btn-controller">
            <MdCall size={22} />
          </button>
          <button className="chat-box-btn-controller">
            <FaVideo size={22} />
          </button>
          <button className="chat-box-btn-controller">
            <span className="material-symbols-outlined font-bold">remove</span>
          </button>
          <button className="chat-box-btn-controller">
            <MdClose size={22} />
          </button>
        </span>
      </div>
      <div className="chat-box-body">
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
        <MessageSend />
        <MessageReceive />
      </div>

      <div className="chat-box-footer">
        <button className="chat-box-btn-footer">
          <BsFileEarmarkImage size={22} />
        </button>
        <input className="chat-box-input" placeholder="Aa" type="text" />
        <button className="chat-box-btn-footer">
          <AiFillLike size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
