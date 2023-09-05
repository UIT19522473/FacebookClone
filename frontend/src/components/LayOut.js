import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import WrapChat from "./Chat/WrapChat";

const LayOut = () => {
  return (
    <>
      <Header />
      <WrapChat />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default LayOut;
