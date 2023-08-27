import React from "react";

const ItemUserNavRight = (props) => {
  const { type, img, title } = props;
  return (
    <li className="flex gap-2 items-center py-2 item-user-nav">
      <div className="wrap-item-nav-right-img">
        {/* {type === "menu" ? "menu" : "link"} */}
        <img className="w-10 h-10 rounded-full" src={img} alt="logo" />
        <p className="item-user-nav-status"></p>
      </div>
      <p>{title}</p>
    </li>
  );
};

export default ItemUserNavRight;
