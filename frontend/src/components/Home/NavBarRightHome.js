import React from "react";
import "../../styles/home/navright.css";

import ItemUserNavRight from "./ItemUserNavRight";
import LogoFacebook from "../../images/facebook.svg";

const NavBarRightHome = () => {
  return (
    <nav className="home-nav-right w-[20%] mr-6">
      <section className="home-nav-right-menu">
        <span className="flex items-center">
          <h3>Người liên hệ</h3>
          <span className="material-symbols-outlined ml-auto mr-3 cursor-pointer">
            search
          </span>
          <span className="material-symbols-outlined cursor-pointer">
            more_horiz
          </span>
        </span>
        <ul className="home-list-item">
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
        </ul>
        {/* <button className="btn-expand">
          <span className="material-symbols-outlined icon-expand">
            expand_more
          </span>
          <p>Xem them</p>
        </button> */}
      </section>

      <section className="home-nav-left-link">
        <h3>Cuoc tro chuyen nhom</h3>
        <ul className="home-list-item">
          <ItemUserNavRight type="menu" img={LogoFacebook} title="user" />
        </ul>
        <button className="btn-expand">
          <span className="material-symbols-outlined icon-expand">add</span>
          <p>Tao nhom moi</p>
        </button>
      </section>
    </nav>
  );
};

export default NavBarRightHome;
