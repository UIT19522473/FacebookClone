import React from "react";
import LogoFacebook from "../../images/facebook.svg";
import { useDispatch } from "react-redux";
import { addDisplay } from "../../features/listchat/listchatSlice";

const ItemUserNavRight = (props) => {
  // const { type, img, title } = props;
  const { user, type, group } = props;

  const dispatch = useDispatch();

  const handleClick = () => {
    if (type === "group") {
      dispatch(addDisplay(group));
    } else {
      dispatch(addDisplay(user));
    }
  };
  return (
    <li
      onClick={handleClick}
      className="wrap-item-nav-right flex gap-2 items-center item-user-nav "
    >
      <div className="wrap-item-nav-right-img">
        {type === "group" ? (
          <img
            className="w-10 h-10 rounded-full"
            src={group ? group?.img : LogoFacebook}
            alt="logo"
          />
        ) : (
          <img
            className="w-10 h-10 rounded-full"
            src={user ? user?.img : LogoFacebook}
            alt="logo"
          />
        )}

        <p className="item-user-nav-status"></p>
      </div>
      <p>{type === "group" ? group?.name : user?.name}</p>
    </li>
  );
};

export default ItemUserNavRight;
