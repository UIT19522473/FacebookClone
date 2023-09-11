import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyPosts from "./MyPosts";
import MyAbout from "./MyAbout";
import MyFriends from "./MyFriends";
import MyPhotos from "./MyPhotos";
import MyVideos from "./MyVideos";
import MyCheckIn from "./MyCheckIn";

const ContentProfile = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  // const [id, setId] = useState(urlParams.get("id") || "");
  const [sk, setSk] = useState("default" || urlParams.get("sk"));
  console.log(typeof sk);

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
  // console.log({ id, sk });
  // useEffect(() => {}, [location]);
  return (
    <div className="wrap-profile-content">
      {sk === "default" && <MyPosts />}
      {sk === "about" && <MyAbout />}
      {sk === "friends" && <MyFriends />}
      {sk === "photos" && <MyPhotos />}
      {sk === "videos" && <MyVideos />}
      {sk === "checkin" && <MyCheckIn />}
    </div>
  );
};

export default ContentProfile;
