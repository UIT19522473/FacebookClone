import * as React from "react";
import { Modal } from "antd";
// import CreatePost from "./Home/CreatePost";
import { useDispatch } from "react-redux";
import { closeCreatePost } from "../features/createPost/createPostSlice";
import { closeRegisterForm } from "../features/registerForm/registerFormSlice";

import "../styles/modal.css";
import {
  closeCreateGroupChat,
  closeGroupChatMembers,
} from "../features/createGroupChat/createGroupChatSlice";
import { closeInvitedCall } from "../features/invitedCall/invitedCallSlice";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function ModalCustom(props) {
  const { type, open } = props;
  const dispatch = useDispatch();

  const handleCancel = () => {
    if (type === "REGISTER") {
      dispatch(closeRegisterForm());
    } else if (type === "CREATEPOST") {
      dispatch(closeCreatePost());
    } else if (type === "CREATEGROUPCHAT") {
      dispatch(closeCreateGroupChat());
    } else if (type === "OPENMEMBERSCHAT") {
      dispatch(closeGroupChatMembers());
    } else if (type === "INVITECALL") {
      dispatch(closeInvitedCall());
    }
  };

  return (
    <div>
      <Modal
        // title="Basic Modal"
        open={open}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        closable={false} // Tắt nút đóng góc trên cùng bên phải
      >
        <div className="items-center justify-center flex">{props.children}</div>
      </Modal>
    </div>
  );
}
