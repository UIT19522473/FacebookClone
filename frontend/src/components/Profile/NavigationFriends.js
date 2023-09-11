import React, { useEffect, useState } from "react";
import "../../styles/profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationButton = (props) => {
  const auth = useSelector((state) => state.auth?.data?.user);
  const { path, name, idU } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickTab = () => {
    // setTabChoose(index);

    //set URL
    const urlParams = new URLSearchParams(location.search);
    if (path === "friends") {
      // urlParams.set("friends", idU || auth?._id);
      // Xoá tham số "sk" từ URL
      urlParams.delete("friends");
      const newUrl = `${location.pathname}?${urlParams.toString()}`;
      // Đổi đường dẫn URL
      navigate(newUrl);
    } else {
      urlParams.set("friends", path);

      const newUrl = `${location.pathname}?${urlParams.toString()}`;

      // Đổi đường dẫn URL
      navigate(newUrl);
    }
  };

  //get URL
  const urlParams = new URLSearchParams(location.search);

  // const [id, setId] = useState(urlParams.get("id") || "");
  const [fr, setFr] = useState(urlParams.get("friends") || "friends");
  useEffect(() => {
    // Lắng nghe sự thay đổi của URL
    const handleUrlChange = () => {
      const newUrlParams = new URLSearchParams(location.search);
      // const newId = newUrlParams.get("id") || "";
      const newFr = newUrlParams.get("friends") || "friends";

      // Cập nhật state với các giá trị mới từ URL
      // setId(newId);
      setFr(newFr);
    };

    handleUrlChange(); // Gọi lần đầu khi component được render

    // Đăng ký lắng nghe sự thay đổi của URL
    window.addEventListener("popstate", handleUrlChange);

    // Cleanup: Hủy đăng ký lắng nghe khi component unmount
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [location.search]);
  return (
    <div
      onClick={handleClickTab}
      className={`wrap-profile-navigation-btn ${
        fr === path ? "wrap-profile-navigation-btn--checked" : ""
      }`}
    >
      <button className="profile-navigation-btn">{name}</button>
    </div>
  );
};

const NavigationFriends = (props) => {
  const { idU } = props;
  // const [tabChoose, setTabChoose] = useState(1);
  return (
    <div className=" wrap-profile-friends-navigation flex items-center bg-black px-2">
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={1}
        path="friends"
        name="Tất cả bạn bè"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={2}
        path="receive"
        name="Lời mời kết bạn"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={3}
        path="send"
        name="Đã gửi kết bạn"
        idU={idU}
      />
    </div>
  );
};

export default NavigationFriends;
