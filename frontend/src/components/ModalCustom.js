import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import { Modal } from "antd";
// import CreatePost from "./Home/CreatePost";
import { useDispatch } from "react-redux";
import { closeCreatePost } from "../features/createPost/createPostSlice";
import { closeRegisterForm } from "../features/registerForm/registerFormSlice";

import "../styles/modal.css";

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
  //   let open = useSelector((state) => state.createPost.open);

  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  //   const handleOpen = () => {
  //     dispatch(openCreatePost());
  //   };

  // const handleClose = () => {
  //   if (type === "REGISTER") {
  //     dispatch(closeRegisterForm());
  //   } else if (type === "CREATEPOST") {
  //     dispatch(closeCreatePost());
  //   }
  // };

  const handleCancel = () => {
    if (type === "REGISTER") {
      dispatch(closeRegisterForm());
    } else if (type === "CREATEPOST") {
      dispatch(closeCreatePost());
    }
  };

  return (
    <div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        // style={{ backgroundColor: "red" }}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        // className="bg-black"
      >
        <div className="absolute top-1/2 left-1/2 w-[580px] translate-x-[-50%] translate-y-[-50%]">
          {props.children}
        </div>
      </Modal> */}

      <Modal
        // title="Basic Modal"
        open={open}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        closable={false} // Tắt nút đóng góc trên cùng bên phải
        // style={{ background: "lightblue", backgroundColor: "lightblue" }}
      >
        <div className="items-center justify-center flex">{props.children}</div>
      </Modal>
    </div>
  );
}
