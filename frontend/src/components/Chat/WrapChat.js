import React from "react";
import "../../styles/chat.css";
// import IconFacebook from "../../images/facebook.svg";
import ChatBox from "./ChatBox";
// import { IoIosCreate } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  addDisplay,
  removeHidden,
} from "../../features/listchat/listchatSlice";
import ModalCustom from "../ModalCustom";
import CreateGroupChatBox from "./CreateGroupChat";
import { openCreateGroupChat } from "../../features/createGroupChat/createGroupChatSlice";

const WrapChat = () => {
  const dispatch = useDispatch();
  const listChat = useSelector((state) => state.listChat);
  const openModal = useSelector((state) => state.groupChat.open);

  const handleDiplayMess = (user, e) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên cấp cao hơn
    dispatch(addDisplay(user));
  };

  const handleCloseHiddenMess = (user, e) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên cấp cao hơn
    dispatch(removeHidden(user));
    // console.log("close");
  };

  const handleCreateGroupChat = () => {
    dispatch(openCreateGroupChat());
  };

  return (
    <div className="chat-container">
      <div className="row-chat">
        {listChat.display?.map((item, index) => (
          <ChatBox user={item} key={index} />
        ))}
      </div>
      <div className="column-chat">
        <button
          onClick={handleCreateGroupChat}
          title="Tạo nhóm chat"
          className="chat-btn-creategroup mt-2 flex items-center justify-center"
        >
          <MdGroupAdd size={24} />
        </button>

        {openModal ? (
          <ModalCustom type="CREATEGROUPCHAT" open={openModal}>
            <CreateGroupChatBox />
          </ModalCustom>
        ) : (
          <></>
        )}

        {listChat.hidden?.map((item, index) => (
          <div
            key={index}
            onClick={(e) => handleDiplayMess(item, e)}
            className="relative flex flex-col items-center text-slate-200 chat-box-hidden"
          >
            <img
              className="w-11 h-11 rounded-full"
              src={item?.img}
              alt="logo"
            />
            <p>{item?.name}</p>
            <button
              onClick={(e) => handleCloseHiddenMess(item, e)}
              className="chat-box-hidden-btnclose absolute"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WrapChat;
