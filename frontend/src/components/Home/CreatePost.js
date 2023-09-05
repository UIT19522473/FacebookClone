// import TextArea from "antd/es/input/TextArea";

import "../../styles/home/createpost.css";
import React, { useRef, useState } from "react";
import { BsFileEarmarkImage } from "react-icons/bs";
// import IconFacebook from "../../images/facebook.svg";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, submitPost } from "../../features/post/postAsync";
import { closeCreatePost } from "../../features/createPost/createPostSlice";
// import { apiGetAllPost } from "../../apis/apiPost";

//selected
const Dropdown = () => {
  const options = ["Công khai", "Riêng tư", "Chỉ bạn bè", "Ngoại trừ"];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      {/* <label htmlFor="dropdown">Select an option:</label> */}
      <select
        className="create-post-select"
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {/* <option value={options[0]}>Công khai</option> */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* {selectedOption && <p>Selected option: {selectedOption}</p>} */}
    </div>
  );
};

const CreatePost = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.data);
  // const { open, setOpen } = props;

  //state post
  // const userId = "1";
  const [desc, setDesc] = useState("");
  // const [type, setType] = useState("public");
  const [imageURL, setImageURL] = useState("");
  const [imgURLLocal, setImgURLLocal] = useState("");

  //file
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Khi nút được nhấp, kích hoạt sự kiện click cho input file
    fileInputRef.current.click();
  };

  //submit post
  const handleSubmitPost = async () => {
    await dispatch(
      submitPost({
        content: {
          img: imgURLLocal,
          desc: desc,
        },
        token: auth?.tokens?.accessToken,
      })
    );
    await dispatch(getAllPosts({ token: auth?.tokens?.accessToken }));
    // setOpen(false);
    dispatch(closeCreatePost());
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);

      setImageURL(imageURL);
      setImgURLLocal(file);
    }
  };

  const handleOnchangeTextArea = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  return (
    <div className="wrap-create-post p-4 rounded-md w-full">
      <div className="create-post-header">
        <div className="wrap-create-post-title flex items-center ">
          <h2 className="flex-1 text-center text-xl">Tạo bài viết</h2>
          <button
            onClick={() => dispatch(closeCreatePost())}
            className="ml-auto mr-2 create-post-btnclose"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="wrap-create-post-user flex items-center gap-2">
          <div className="create-post-user-img rounded-full w-12 h-12">
            <img
              className="w-full h-full rounded-full"
              src={auth?.user?.img}
              alt="logo"
            />
          </div>
          <div className="create-post-user-info">
            <p className="text-base">{auth?.user?.email}</p>

            <Dropdown />
          </div>
        </div>
      </div>

      <div className="create-post-body mt-3">
        <div className="create-post-text">
          <textarea
            onChange={handleOnchangeTextArea}
            value={desc}
            className="create-post-textarea "
            placeholder={`${auth?.user?.email}, bạn đang nghĩ gì thế`}
          />
        </div>
        <div className="create-post-img">
          {imageURL !== "" ? (
            <img className="custom-image" src={imageURL} alt="logo" />
          ) : (
            <></>
          )}
        </div>
        <div className="create-post-add flex items-center justify-between mt-3">
          <p>Thêm ảnh vào bài viết của bạn</p>
          <div>
            <button
              className="upload-button text-green-600"
              onClick={handleButtonClick}
            >
              <BsFileEarmarkImage size={24} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Ẩn input file
            />
          </div>
        </div>
      </div>
      <div className="create-post-footer mt-3">
        <button onClick={handleSubmitPost} className="create-post-btnpost">
          Đăng
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
