import React from "react";

const ItemNavLeft = (props) => {
  const { type, img, title } = props;
  return (
    <li className="flex gap-2 items-center py-2">
      <div className="wrap-item-nav-left-img">
        {/* {type === "menu" ? "menu" : "link"} */}
        <img className="w-10 h-10" src={img} alt="logo" />
      </div>
      <p>{title}</p>
    </li>
  );
};

export default ItemNavLeft;
