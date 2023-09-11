import React, { useRef } from "react";
import "../../styles/chat.css";
// import FacebookIcon from "../../images/facebook.svg";
import { MdCall, MdClose } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
// import { GrSubtract } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import MessageReceive from "./MessageReceive";
import MessageSend from "./MessageSend";
import { useDispatch } from "react-redux";
import {
  addHidden,
  removeDisplay,
} from "../../features/listchat/listchatSlice";

import { Dropdown, Menu } from "antd";

const ChatBox = (props) => {
  const dispatch = useDispatch();
  const { user } = props;
  const handleCloseMess = () => {
    dispatch(removeDisplay(user));
    // console.log("hello");
  };

  const handleHiddenMess = () => {
    dispatch(addHidden(user));
  };


  const handleClickItem = (key) => {
    console.log(key);
  };

  const dataGroupDropDown = [
    {
      label: (
        <button onClick={() => handleClickItem(0)} className="p-2">
          Thành viên nhóm
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button onClick={() => handleClickItem(1)} className="p-2">
          Thay đổi ảnh
        </button>
      ),
      key: "1",
    },

    {
      label: (
        <button onClick={() => handleClickItem(2)} className="p-2">
          Đổi tên nhóm
        </button>
      ),
      key: "2",
    },
    {
      label: (
        <button onClick={() => handleClickItem(3)} className="p-2">
          Thêm thành viên
        </button>
      ),
      key: "3",
    },
    {
      label: (
        <button onClick={() => handleClickItem(4)} className="p-2">
          Rời nhóm
        </button>
      ),
      key: "4",
    },
  ];

  const dataFriendDropDown = [
    {
      label: (
        <button onClick={() => handleClickItem(0)} className="p-2">
          Xem trang cá nhân
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button onClick={() => handleClickItem(1)} className="p-2">
          Biệt danh
        </button>
      ),
      key: "1",
    },

    {
      label: (
        <button onClick={() => handleClickItem(2)} className="p-2">
          Chặn người dùng
        </button>
      ),
      key: "2",
    },
    // {
    //   label: (
    //     <button onClick={() => handleClickItem(3)} className="p-2">
    //       Thêm thành viên
    //     </button>
    //   ),
    //   key: "3",
    // },
    // {
    //   label: (
    //     <button onClick={() => handleClickItem(4)} className="p-2">
    //       Rời nhóm
    //     </button>
    //   ),
    //   key: "4",
    // },
  ];

  const dropdowRef = useRef(null);
  const handleOpenDropdown = () => {
    dropdowRef.current.click();
  };
  return (
    <div className="chat-box">
      <div className="chat-box-header flex items-center justify-between">
        <span
          onClick={() => handleOpenDropdown()}
          className="chat-box-info flex items-center gap-2 cursor-pointer relative"
        >
          <img className="w-10 h-10 rounded-full" src={user?.img} alt="icon" />
          <div className="chat-box-infor-user">
            <Dropdown
              className="absolute -top-[10px] -left-[122%]"
              menu={
                user.members
                  ? { items: dataGroupDropDown }
                  : { items: dataFriendDropDown }
              }
              trigger={["click"]}
            >
              <button ref={dropdowRef} onClick={(e) => e.preventDefault()} />
            </Dropdown>
            <p className="chat-box-infor-user-name text-sm font-semibold">
              {user?.name}
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
          <button
            onClick={handleHiddenMess}
            className="chat-box-btn-controller"
          >
            <span className="material-symbols-outlined font-bold">remove</span>
          </button>
          <button onClick={handleCloseMess} className="chat-box-btn-controller">
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
