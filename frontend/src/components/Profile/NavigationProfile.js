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
    if (path === "default") {
      urlParams.set("id", idU || auth?._id);
      // Xoá tham số "sk" từ URL
      urlParams.delete("sk");
      const newUrl = `${location.pathname}?${urlParams.toString()}`;
      // Đổi đường dẫn URL
      navigate(newUrl);
    } else {
      urlParams.set("sk", path);

      const newUrl = `${location.pathname}?${urlParams.toString()}`;

      // Đổi đường dẫn URL
      navigate(newUrl);
    }
  };

  //get URL
  const urlParams = new URLSearchParams(location.search);

  // const [id, setId] = useState(urlParams.get("id") || "");
  const [sk, setSk] = useState(urlParams.get("sk") || "default");
  useEffect(() => {
    // Lắng nghe sự thay đổi của URL
    const handleUrlChange = () => {
      const newUrlParams = new URLSearchParams(location.search);
      // const newId = newUrlParams.get("id") || "";
      const newSk = newUrlParams.get("sk") || "default";

      // Cập nhật state với các giá trị mới từ URL
      // setId(newId);
      setSk(newSk);
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
        sk === path ? "wrap-profile-navigation-btn--checked" : ""
      }`}
    >
      <button className="profile-navigation-btn">{name}</button>
    </div>
  );
};

const NavigationProfile = (props) => {
  const { idU } = props;
  // const [tabChoose, setTabChoose] = useState(1);
  return (
    <div className="wrap-profile-navigation flex items-center bg-black mt-10 px-2">
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={1}
        path="default"
        name="Bài viết"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={2}
        path="about"
        name="Giới thiệu"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={3}
        path="friends"
        name="Bạn bè"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={4}
        path="photos"
        name="Ảnh"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={5}
        path="videos"
        name="Video"
        idU={idU}
      />
      <NavigationButton
        // tabChoose={tabChoose}
        // setTabChoose={setTabChoose}
        index={6}
        path="checkin"
        name="Check in"
        idU={idU}
      />
    </div>
  );
};

export default NavigationProfile;
