import React, { useRef, useState } from "react";
import "../../styles/chat.css";

import { MdClose } from "react-icons/md";

import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateGroupChat } from "../../features/createGroupChat/createGroupChatSlice";
import { getUsers } from "../../features/search/searchAsync";
import { apiCreateChatGroup } from "../../apis/apiChatGroup";
import { getGroupChat } from "../../features/chatGroup/chatGroupAsync";

import io from "socket.io-client";
const socket = io(process.env.REACT_APP_URL_SERVER);

const CreateGroupChat = () => {
  const dispatch = useDispatch();
  const dataSearch = useSelector((state) => state.search.data);
  const auth = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(closeCreateGroupChat());
  };

  const [toggleImg, setToggle] = useState(false);

  const [nameGroup, setNameGroup] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imgURLLocal, setImgURLLocal] = useState("");

  //file
  const fileInputRef = useRef(null);
  const handleAddImgClick = () => {
    // Khi nút được nhấp, kích hoạt sự kiện click cho input file
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);

      setImageURL(imageURL);
      setImgURLLocal(file);

      setToggle(!toggleImg);
    }
  };

  const onSearch = (value) => {
    // console.log("search:", value);
    dispatch(
      getUsers({
        content: {
          name: value,
        },
        token: auth?.data?.tokens?.accessToken,
      })
    );
  };

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClose = (removedTag) => {
    const newTags = selectedTags.filter((tag) => tag !== removedTag);
    setSelectedTags(newTags);
  };

  const handleCreateGroupChat = async () => {
    // const dataCreatGroupChat = {
    //   name: nameGroup,
    //   members: selectedTags,
    //   img: imgURLLocal,
    //   historyChat: [],
    // };
    dispatch(closeCreateGroupChat());
    await apiCreateChatGroup({
      content: {
        name: nameGroup,
        members: [...selectedTags, auth.data?.user?._id],
        img: imgURLLocal,
        historyChat: [],
      },
      token: auth?.data?.tokens?.accessToken,
    });
    await dispatch(
      getGroupChat({
        content: auth?.data?.user?._id,
        token: auth?.data?.tokens?.accessToken,
      })
    );
    // console.log(dataCreatGroupChat);

    socket.emit("joinRoom", {
      // idRoom: `chatPrivate_${auth?._id}`,
      idUser: auth?.data?.user?._id,
    });
    socket.emit("createGroupChat", {
      // idRoom: `chatPrivate_${auth?._id}`,
      idUser: auth?.data?.user?._id,
      name: nameGroup,
      members: selectedTags,
    });
  };

  return (
    <div className="wrap-create-group-chat rounded-md">
      <div className="create-group-chat-header flex items-center mb-2 p-2">
        <p className="text-lg font-bold text-center flex-1">Tạo nhóm chat</p>
        <button className="ml-auto" onClick={handleClose}>
          <MdClose size={22} />
        </button>
      </div>
      <div className="create-group-chat-body p-2">
        <div className="create-group-chat-setname flex items-center gap-2 mb-2">
          <p className="w-[120px]">Đặt tên nhóm:</p>
          <input
            value={nameGroup}
            onChange={(e) => setNameGroup(e.target.value)}
            type="text"
            className="text-base font-bold flex-1 bg-transparent outline-none border-b-[1px] border-gray-700"
          />
        </div>

        <div className="create-group-chat-addmember flex items-center gap-2 mb-2">
          <p className="w-[120px]">Thêm thành viên:</p>
          <Select
            style={{ width: "full", padding: 4 }}
            dropdownStyle={{
              backgroundColor: "#242526",
            }}
            maxTagCount={3} // Số lượng tag tối đa hiển thị
            maxTagPlaceholder={(omittedTags) => `+ ${omittedTags.length} more`} // Placeholder khi có quá nhiều tag
            className="custom-select border-b-[1px] border-gray-700 flex-1"
            mode="tags"
            showSearch
            placeholder="Tìm thành viên"
            value={selectedTags}
            onChange={(tags) => setSelectedTags(tags)}
            onSearch={onSearch}
            notFoundContent={<span className="text-white"></span>}
            optionFilterProp="name"
            tagRender={(props) => {
              const { label, value } = props;
              return (
                <div className="m-1 flex items-center gap-1">
                  {label}
                  <button
                    className="ant-select-selection-item-remove p-1 flex items-center justify-center "
                    // onClick={() => handleTagClose(inputValue)}
                    onClick={() => handleTagClose(value)}
                  >
                    <p className="text-white">x</p>
                  </button>
                </div>
              );
            }}
          >
            {dataSearch?.map((item, index) => (
              <Select.Option key={index} value={item._id} name={item.name}>
                {/* Sử dụng name tại đây */}
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={item?.img}
                    alt=""
                  />
                  <span className="">{item.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="create-group-chat-addimage flex gap-2">
          <p className="w-[120px]">Thêm ảnh nhóm:</p>

          {toggleImg ? (
            <div className="flex-1 h-44 ">
              <img
                className="w-full h-full object-contain"
                src={imageURL}
                alt="logo"
              />
            </div>
          ) : (
            <button
              onClick={handleAddImgClick}
              className="border-[1px] px-2 flex-1 h-44 border-blue-400"
            >
              + Thêm ảnh
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Ẩn input file
          />
        </div>
      </div>
      <div className="create-group-chat-footer p-2 flex justify-end gap-4 mt-4">
        <button
          onClick={handleClose}
          className="create-group-chat-btnfooter create-group-chat-btnfooter--cancel "
        >
          Hủy
        </button>
        <button
          onClick={handleCreateGroupChat}
          className="create-group-chat-btnfooter"
        >
          Tạo mới
        </button>
      </div>
    </div>
  );
};

export default CreateGroupChat;
