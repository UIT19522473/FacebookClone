import React, { useState } from "react";
import "../styles/header.css";
import { AiOutlineHome, AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { RiSlideshow3Line, RiSlideshow3Fill } from "react-icons/ri";
import { BiGroup, BiSolidGroup, BiSolidUser } from "react-icons/bi";
import { PiGameControllerDuotone, PiGameControllerFill } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { BsMessenger } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import IconFacebook from "../../src/images/facebook.svg";
import ButtonSwitchPage from "./Home/ButtonSwitchPage";
import RightItem from "./Home/RightItem";

const Header = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  return (
    <header className="grid grid-cols-12 header">
      <div className="lg:col-span-3 col-span-2 flex gap-1 my-2 items-center">
        <img className="icon-facebook" src={IconFacebook} alt="logo" />
        <div className="header-search flex items-center justify-center gap-2 rounded-3xl">
          <div className="header-search-icon flex items-center justify-center">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            className="bg-transparent border-none outline-none header-search-input hidden lg:block"
            type="text"
            placeholder="Tìm kiếm trên Facebook"
          />
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
          <BiSolidUser />
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
