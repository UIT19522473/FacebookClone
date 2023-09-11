import React from "react";
import "../../styles/home/navleft.css";
import ItemNavLeft from "./ItemNavLeft";
import LogoFacebook from "../../images/facebook.svg";
import { useSelector } from "react-redux";

const NavBarLeftHome = () => {
  const auth = useSelector((state) => state.auth?.data?.user);
  return (
    <nav className="home-nav-left w-[23%]">
      <section className="home-nav-left-menu">
        <ul className="home-list-item">
          <ItemNavLeft
            type="menu"
            img={LogoFacebook}
            title="user"
            auth={auth}
            link="profile"
          />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
        </ul>
        <button className="btn-expand">
          <span className="material-symbols-outlined icon-expand">
            expand_more
          </span>
          <p>Xem them</p>
        </button>
      </section>

      <section className="home-nav-left-link">
        <h3>Loi tat cua ban</h3>
        <ul className="home-list-item">
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
          <ItemNavLeft type="menu" img={LogoFacebook} title="user" />
        </ul>
        <button className="btn-expand">
          <span className="material-symbols-outlined icon-expand">
            expand_more
          </span>
          <p>Xem them</p>
        </button>
      </section>
    </nav>
  );
};

export default NavBarLeftHome;
