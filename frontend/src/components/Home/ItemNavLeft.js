import React from "react";
import { useNavigate } from "react-router-dom";

const ItemNavLeft = (props) => {
  const navigate = useNavigate();
  const { img, title, auth, link } = props;
  const handleNavigate = () => {
    navigate(link || "/");
  };
  return (
    <li
      onClick={handleNavigate}
      className="flex gap-2 items-center py-2 cursor-pointer"
    >
      <div className="wrap-item-nav-left-img">
        {auth ? (
          <img className="rounded-full w-10 h-10" src={auth?.img} alt="logo" />
        ) : (
          <img className="rounded-full w-10 h-10" src={img} alt="logo" />
        )}
      </div>
      {auth ? <p>{auth?.name}</p> : <p>{title}</p>}
    </li>
  );
};

export default ItemNavLeft;
