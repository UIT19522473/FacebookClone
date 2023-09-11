import React, { useEffect, useState } from "react";
import "../../styles/home/navright.css";

import ItemUserNavRight from "./ItemUserNavRight";
import LogoFacebook from "../../images/facebook.svg";
import { apiGetUsers } from "../../apis/apiSearch";
import { useSelector } from "react-redux";

const NavBarRightHome = () => {
  const auth = useSelector((state) => state.auth);

  const [listFriends, setListFriends] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        // Gọi các hàm bất đồng bộ ở đây sử dụng 'await'
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const response = await apiGetUsers({
          // content: {
          //   name: "",
          // },
          token: auth?.data?.tokens?.accessToken,
        });

        setListFriends(response?.data?.metadata);

        // console.log(listFriends);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
      }
    }

    // Gọi hàm fetchData
    fetchData();
  }, [auth?.data?.tokens?.accessToken]); // Đảm bảo rằng 'useEffect' chỉ chạy một lần sau khi mount component

  // fake group chat
  const groupChat = {
    _id: 123,
    members: [],
    message: [],
    name: "Group Test",
    img: "https://phucnvh.s3.ap-southeast-1.amazonaws.com/image_group.jpeg",
  };

  return (
    <nav className="home-nav-right w-[20%] mr-6">
      <section className="home-nav-right-menu">
        <span className="flex items-center mb-2">
          <h3>Người liên hệ</h3>
          <span className="material-symbols-outlined ml-auto mr-3 cursor-pointer">
            search
          </span>
          <span className="material-symbols-outlined cursor-pointer">
            more_horiz
          </span>
        </span>
        <ul className="home-list-item">
          {listFriends?.map((user, index) => {
            if (user?._id !== auth?.data?.user?._id)
              return (
                <ItemUserNavRight
                  key={index}
                  type="friend"
                  // img={LogoFacebook}
                  // title="user"
                  user={user}
                />
              );
          })}
        </ul>
      </section>

      <section className="home-nav-left-link">
        <h3>Cuoc tro chuyen nhom</h3>
        <ul className="home-list-item">
          <ItemUserNavRight type="group" img={LogoFacebook} group={groupChat} />
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
