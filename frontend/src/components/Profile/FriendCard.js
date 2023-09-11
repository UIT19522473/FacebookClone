import React from "react";
import "../../styles/profile.css";

const FriendCard = (props) => {
  const type = "receive";
  return (
    <div className="wrap-friend-card w-full flex items-center gap-2 ">
      <div className="wrap-friend-card-img w-28 h-28 ">
        <img
          className="w-full h-full  rounded-lg"
          src="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-gai-xinh-toc-ngan-viet-nam-3-07-10-00-34-1.jpg"
          alt="logo"
        />
      </div>
      <div className="wrap-friend-card-content">
        <p className="text-lg font-bold">Tuân Nguyễn</p>
        <p className="text-sm">10 bạn chung</p>
      </div>
      <div className="wrap-friend-card-button ml-auto mr-6">
        {type === "friend" && (
          <button className="friend-card-button">Hủy kết bạn</button>
        )}
        {type === "receive" ? (
          <div className="flex items-center gap-2">
            <button className="friend-card-button friend-card-button--confirm">
              Xác nhận
            </button>
            <button className="friend-card-button">Xóa</button>
          </div>
        ) : (
          <></>
        )}

        {type === "send" && (
          <>
            <button className="friend-card-button">Gỡ lời mời</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
