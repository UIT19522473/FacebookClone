import React from "react";
import { NavLink } from "react-router-dom";

const ButtonSwitchPage = (props) => {
  const { selectedPage, setSelectedPage, id, linkPage } = props; // Lấy điều kiện từ props
  // const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setSelectedPage(id);
  };

  return (
    <div
      className={`wrap-icon-page  ${
        id === 5 ? "lg:hidden block" : "hidden md:block"
      }`}
    >
      <NavLink
        to={linkPage}
        onClick={handleClick}
        className={`icon-page  ${
          selectedPage === id ? "icon-page--selected" : ""
        }`}
      >
        {selectedPage === id ? props.children[1] : props.children[0]}
      </NavLink>
    </div>
  );
};

export default ButtonSwitchPage;
