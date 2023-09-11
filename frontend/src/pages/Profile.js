import React, { useEffect, useState } from "react";
// import IconFacebook from "../images/facebook.svg";
import "../styles/profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiGetUsers } from "../apis/apiSearch";
import { FaUserPlus } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import NavigationProfile from "../components/Profile/NavigationProfile";
import ContentProfile from "../components/Profile/ContentProfile";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const id = searchParams.get("id") || auth?.data?.user?._id;

  // Lấy giá trị của tham số 'id' từ đối tượng searchParams
  // const id = searchParams.get("id");

  const [data, setData] = useState(null); // Dữ liệu fetched sẽ được lưu ở đây

  useEffect(() => {
    //get URL
    const urlParams = new URLSearchParams(location.search);
    //default url
    //neu khong co id tren duong dan se tu dong gan id ca nhan
    urlParams.set("id", id);

    const newUrl = `${location.pathname}?${urlParams.toString()}`;

    // Đổi đường dẫn URL
    navigate(newUrl);
    // Thực hiện fetch data ở đây
    const fetchData = async () => {
      try {
        const response = await apiGetUsers({
          content: {
            idU: id,
          },
          token: auth?.data?.tokens?.accessToken,
        }); // Thay đổi URL tương ứng
        // const result = await response.json();
        const result = response?.data?.metadata[0];
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData(); // Gọi hàm fetch khi component được tạo
  }, [
    auth?.data?.tokens?.accessToken,
    id,
    location.pathname,
    location.search,
    navigate,
  ]);

  return (
    <div className="container text-white">
      <div className="wrap-profile-info relative">
        <div className="wrap-profile-wall h-96">
          <img
            className="h-full w-full object-cover"
            src="https://img.freepik.com/free-photo/red-brick-wall-pattern-texture_53876-147793.jpg?w=2000"
            alt="logo"
          />
        </div>
        <div className="wrap-profile-controller flex justify-between absolute top-[82%] w-full p-4">
          <div className="wrap-profile-identify flex relative pb-1">
            <img
              className="h-40 w-40 border-[#242526] border-4 rounded-full m-1 p-0 profile-img-avatar absolute -top-full left-0"
              src={data?.img}
              alt="logo"
            />
            <div className="profile-indentify-detail mt-auto mb-4 ml-44">
              <p className="text-2xl font-bold">{data?.name}</p>
              <p>0 ban chung</p>
            </div>
          </div>

          <div className="wrap-profile-controller-button mt-auto mb-6 flex gap-2">
            <button className="py-2 px-4  bg-blue-500 rounded-lg flex items-center gap-2">
              <FaUserPlus />
              <p className="font-semibold ">Thêm bạn bè</p>
            </button>
            <button className="py-2 px-4  bg-gray-700 rounded-lg flex items-center gap-2">
              <BsMessenger />
              <p className="font-semibold">Nhắn tin</p>
            </button>
          </div>
        </div>
      </div>

      <NavigationProfile idU={id} />

      <ContentProfile />
    </div>
  );
};

export default Profile;
