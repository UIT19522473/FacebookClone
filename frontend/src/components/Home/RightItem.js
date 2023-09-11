import React, { useEffect, useRef, useState } from "react";
import InviteAddFriend from "../InviteAddFriend";
// import IconFacebook from "../../images/facebook.svg";

const RightItem = (props) => {
  const { id } = props;

  const [openNotify, setOpenNotify] = useState(false);
  const menuNotifyRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuNotifyRef.current && !menuNotifyRef.current.contains(e.target)) {
        setOpenNotify(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClickItem = (e) => {
    if (id === 4) {
      e.preventDefault();
      e.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên cấp cao hơn
      setOpenNotify(!openNotify);
    }
  };

  return (
    <div
      onClick={(e) => handleClickItem(e)}
      className={`wrap-header-right-item flex items-center justify-center text-xl relative  ${
        id === 1 ? "lg:hidden flex" : ""
      } ${id === 2 ? "lg:flex hidden" : ""}`}
    >
      {props.children}

      {id === 4 && (
        <div
          ref={menuNotifyRef}
          onClick={(e) => e.stopPropagation()}
          className={`menu-notify  ${
            openNotify && "menu-notify--display "
          }absolute top-[110%] -right-[50px] bg-white`}
        >
          <h1 className="text-2xl font-bold mb-6">Thông báo</h1>
          <div className="menu-notify-invite-wrap mt-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Lời mời kết bạn</h2>
              <button className="menu-notify-invite-more-btn text-sm">
                Xem tất cả
              </button>
            </div>

            <div className="menu-notify-invite-item-wrap mb-6">
              <InviteAddFriend />
              <InviteAddFriend />
              <InviteAddFriend />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightItem;
