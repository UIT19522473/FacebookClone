/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import "../../styles/home/navright.css";

import ItemUserNavRight from "./ItemUserNavRight";
import LogoFacebook from "../../images/facebook.svg";
import { apiGetUsers } from "../../apis/apiSearch";
import { useSelector } from "react-redux";
import { getGroupChat } from "../../features/chatGroup/chatGroupAsync";
import { useDispatch } from "react-redux";

const NavBarRightHome = () => {
  const dispatch = useDispatch();
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
    members: [
      { _id: 123, name: "tuan", img: "demo" },
      { _id: 124, name: "duyen", img: "demo" },
      { _id: 125, name: "duy", img: "demo" },
    ],
    message: [],
    name: "Group Test",
    img: "https://phucnvh.s3.ap-southeast-1.amazonaws.com/image_group.jpeg",
  };

  const acessToken = useSelector(
    (state) => state.auth?.data?.tokens?.accessToken
  );
  useEffect(() => {
    const fetchGroup = async () => {
      // const response = await apiGetChatGroup({
      //   content: auth?._id,
      //   token: acessToken,
      // });
      // console.log("grouppppp", response);
      await dispatch(
        getGroupChat({
          content: auth?.data?.user?._id,
          token: acessToken,
        })
      );
    };
    fetchGroup();
  }, [acessToken, auth?.data?.user?._id, dispatch]);

  const dataChatGroup = useSelector((state) => state.chatGroup);

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
          {dataChatGroup?.data?.map((item, index) => (
            <ItemUserNavRight
              key={index}
              type="group"
              img={LogoFacebook}
              group={item}
            />
          ))}
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
