import React from "react";
import NavBarLeftHome from "../components/Home/NavBarLeftHome";
import NavBarRightHome from "../components/Home/NavBarRightHome";
import Content from "../components/Home/Content";

const Home = () => {
  return (
    <body className="grid grid-cols-12 home-body">
      <div className="col-span-3 ">
        <NavBarLeftHome />
      </div>
      <div className="col-span-6 wrap-content">
        <Content />
      </div>
      <div className="col-span-3">
        <NavBarRightHome />
      </div>
    </body>
  );
};

export default Home;
