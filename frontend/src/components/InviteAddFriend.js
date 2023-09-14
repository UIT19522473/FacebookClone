import React from "react";
import "../styles/header.css";
import IconFacebook from "../images/facebook.svg";

const InviteAddFriend = () => {
  return (
    <div
      //   onClick={() => console.log("hello")}
      className="item-notify-invite flex gap-2 mb-4"
    >
      <div className="w-20 h-20">
        <img
          className="w-full h-full rounded-full"
          src={IconFacebook}
          alt="logo"
        />
      </div>
      <div className="item-notify-invite-content flex-1 mr-4">
        <span className="item-notify-invite-desc ">
          <p className="text-base">
            <span className="font-semibold">Tuân Nguyễn</span> đã gửi cho bạn
            lời mời kết bạn
          </p>
        </span>
        <p className="item-notify-invite-time text-sm mt-1">1 ngày trước</p>

        <div className="item-notify-invite-controller-wrap flex items-center gap-2 mt-4">
          <div className="item-notify-invite-controller-btn">Xác nhận</div>
          <div className="item-notify-invite-controller-btn item-notify-invite-controller-btn--remove">
            Xóa
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteAddFriend;
