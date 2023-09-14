import React from "react";
import "../../styles/chat.css";
import { useSelector, useDispatch } from "react-redux";
import { closeGroupChatMembers } from "../../features/createGroupChat/createGroupChatSlice";

const MdMemberGroupChat = () => {
  const dispatch = useDispatch();
  const group = useSelector(
    (state) => state.groupChat.openMembers.infoGroup?.members
  );

  const handleClose = () => {
    dispatch(closeGroupChatMembers());
  };
  return (
    <div className="wrap-modal-member-groupchat w-full h-[600px]">
      <div className="member-groupchat-header flex justify-between  px-4 py-2">
        <h1 className="text-center flex-1 text-white text-xl font-semibold">
          Thành viên nhóm
        </h1>
        <button onClick={handleClose}>
          <span className="material-symbols-outlined font-semibold text-gray-300">
            close
          </span>
        </button>
      </div>
      <div className="member-groupchat-body">
        {group?.map((item, index) => (
          <p className="p-4 text-white">{item?.name}</p>
        ))}
      </div>
    </div>
  );
};

export default MdMemberGroupChat;
