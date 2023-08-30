import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const LayOut = () => {
  return (
    <>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default LayOut;
