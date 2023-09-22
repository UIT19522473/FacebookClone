import React, { useEffect, useState } from "react";
import "../styles/header.css";
import { AiOutlineHome, AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { RiSlideshow3Line, RiSlideshow3Fill } from "react-icons/ri";
import { BiGroup, BiSolidGroup } from "react-icons/bi";
import { PiGameControllerDuotone, PiGameControllerFill } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { BsMessenger } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import IconFacebook from "../../src/images/facebook.svg";
import ButtonSwitchPage from "./Home/ButtonSwitchPage";
import RightItem from "./Home/RightItem";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import { getUsers } from "../features/search/searchAsync";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";
import { addNotify } from "../features/notify/notifySlice";
import { getGroupChat } from "../features/chatGroup/chatGroupAsync";
const socket = io(process.env.REACT_APP_URL_SERVER);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(1);
  const auth = useSelector((state) => state.auth);
  const dataSearch = useSelector((state) => state.search.data);

  const [selectedOptions, setSelectedOptions] = useState([]); // Danh sách các tùy chọn đã chọn

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setSelectedOptions([]); // Cập nhật danh sách các tùy chọn đã chọn

    navigate(`/profile?id=${value}`);
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

  const acessToken = useSelector(
    (state) => state.auth?.data?.tokens?.accessToken
  );

  useEffect(() => {
    socket.emit("joinRoom", {
      // idRoom: `chatPrivate_${auth?._id}`,
      idUser: auth?.data?.user?._id,
    });

    socket.on("notifyReceived", (data) => {
      const { type, payload } = data;
      // console.log("demo o day", { type, payload });
      // console.log("thong bao moi", { type, payload });
      dispatch(addNotify({ type, payload }));
      if (type === "CREATE_CHAT_GROUP") {
        dispatch(
          getGroupChat({
            content: auth?.data?.user?._id,
            token: acessToken,
          })
        );
      }
    });
  }, [acessToken, auth?.data?.user?._id, dispatch]);

  return (
    <header className="grid grid-cols-12 header">
      <div className="lg:col-span-3 col-span-2 flex gap-1 my-2 items-center">
        <img
          onClick={() => navigate(`/`)}
          className="icon-facebook cursor-pointer"
          src={IconFacebook}
          alt="logo"
        />
        <div className="header-search flex items-center justify-center gap-2 rounded-3xl">
          <div className="header-search-icon flex items-center justify-center">
            <span className="material-symbols-outlined">search</span>
          </div>
          {/* <input
            className="bg-transparent border-none outline-none header-search-input hidden lg:block"
            type="text"
            placeholder="Tìm kiếm trên Facebook"
          /> */}

          <Select
            style={{ width: 200, padding: 4 }}
            className="custom-select"
            // mode="tags"
            value={selectedOptions}
            showSearch
            placeholder="Tìm kiếm trên Facebook"
            onChange={onChange}
            onSearch={onSearch}
            dropdownStyle={{ backgroundColor: "#242526" }}
            notFoundContent={<span className="text-white"></span>}
            optionFilterProp="name" // Chỉ định trường dữ liệu cho việc tìm kiếm

            // optionLabelProp="name" // Chỉ định thuộc tính label làm nhãn cho mỗi mục
            // optionRender={customOptionRender} // Sử dụng hàm tùy chỉnh để render mỗi mục
            // filterOption={false} // Tắt filterOption
            // filterOption={(input, option) =>
            //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            // }
            // options={[
            //   {
            //     value: "jack",
            //     label: "tuan",
            //     imageSrc:
            //       "https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fHww&w=1000&q=80",
            //   },
            //   {
            //     value: "lucy",
            //     label: "Lucy",
            //   },
            //   {
            //     value: "tom",
            //     label: "Tom",
            //   },
            // ]}
          >
            {dataSearch?.map((item, index) => (
              <Select.Option key={item.name} value={item._id} name={item.name}>
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
      </div>
      <div className="lg:col-span-6 col-span-2 flex lg:justify-center items-center">
        <ButtonSwitchPage
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={1}
          linkPage={"/"}
        >
          <AiOutlineHome />
          <AiFillHome />
        </ButtonSwitchPage>

        <ButtonSwitchPage
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={2}
          linkPage={"watch"}
        >
          <RiSlideshow3Line />
          <RiSlideshow3Fill />
        </ButtonSwitchPage>

        <ButtonSwitchPage
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={3}
          linkPage={"group"}
        >
          <BiGroup />
          <BiSolidGroup />
        </ButtonSwitchPage>

        <ButtonSwitchPage
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={4}
          linkPage={"game"}
        >
          <PiGameControllerDuotone />
          <PiGameControllerFill />
        </ButtonSwitchPage>

        <ButtonSwitchPage
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={5}
          linkPage={"bookemarks"}
        >
          <HiMenu />
          <HiMenu />
        </ButtonSwitchPage>
      </div>
      <div className="wrap-header-right lg:col-span-3 col-span-8 flex items-center gap-2 ml-auto mr-4">
        {/* btn post when responsive */}
        <RightItem id={1}>
          <AiOutlinePlus />
        </RightItem>

        {/* btn menu */}
        <RightItem id={2}>
          <CgMenuGridO />
        </RightItem>
        {/* btn message */}
        <RightItem id={3}>
          <BsMessenger />
        </RightItem>
        {/* btn notify */}
        <RightItem id={4}>
          <IoMdNotifications />
        </RightItem>
        {/* btn user */}
        <RightItem id={5}>
          {/* <BiSolidUser /> */}

          <img
            className="w-8 h-8 rounded-full"
            src={auth?.data?.user?.img}
            alt="logo"
          />
        </RightItem>

        {/* <div className="wrap-header-right-item header-menu text-xl">
          <CgMenuGridO />
        </div>
        <div className="wrap-header-right-item header-mess text-xl">
          <BsMessenger />
        </div>
        <div className="wrap-header-right-item header-notify text-xl">
          <IoMdNotifications />
        </div>
        <div className="wrap-header-right-item header-user text-xl">
          <BiSolidUser />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
