import React, { useState } from "react";
import "../styles/modalregister.css";
import { AiFillQuestionCircle } from "react-icons/ai";

// import { Select } from "antd";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { dataDay, dataMonth, dataYear } from "../helps/dataBirthDay";
import { apiSignUp } from "../apis/apiAuth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "../features/registerForm/registerFormSlice";

import { DatePicker } from "antd";

const Register = (props) => {
  const dispatch = useDispatch();
  // const { open, setOpen } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // const [day, setDay] = React.useState(1);

  //handle when sign up
  const handleSignUp = async () => {
    try {
      const response = await apiSignUp({
        name: name,
        email: email,
        password: pass,
      });
      if (response.data.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // const handleChangeDay = (event) => {
  //   setDay(event.target.value);
  // };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="wrap-form-register bg-white rounded-lg w-full">
      <div className="form-register-header flex justify-between">
        <span>
          <h1 className="text-3xl font-bold">Đăng ký</h1>
          <p className="mt-1">Nhanh chóng và dễ dàng</p>
        </span>
        <button
          onClick={() => dispatch(closeRegisterForm())}
          className="form-register-btn-close mb-3"
        >
          <span className="material-symbols-outlined font-extrabold">
            close
          </span>
        </button>
      </div>
      <div className="form-register-body">
        <div className="form-register-row-input">
          <input type="text" name="ho" id="ho" placeholder="Họ" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="ten"
            id="ten"
            placeholder="Tên"
          />
        </div>
        <div className="form-register-row-input">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="mail"
            id="mail"
            placeholder="Số di động hoặc email"
          />
        </div>
        <div className="form-register-row-input">
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="text"
            name="newpass"
            id="newpass"
            placeholder="Mật khẩu mới"
          />
        </div>

        <div className="form-register-row-select mt-3">
          <span className="form-register-row-title flex gap-1">
            <p className="text-xs font-semibold">Ngày sinh</p>
            <AiFillQuestionCircle />
          </span>
          <div className="flex gap-3 mt-2">
            {/* <Select
              style={{ width: 200, height: 50 }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={day}
              label="Age"
              onChange={handleChangeDay}
            >
              {dataDay.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}

            </Select> */}
            <DatePicker
              onChange={onChangeDate}
              picker="date"
              placeholder="Ngày"
              format="DD" // Hiển thị chỉ số ngày
            />
            <DatePicker
              onChange={onChangeDate}
              picker="month"
              placeholder="Tháng"
              format="MM" // Hiển thị chỉ số tháng
            />
            <DatePicker
              onChange={onChangeDate}
              picker="year"
              placeholder="Năm"
              format="YYYY" // Hiển thị chỉ số năm
            />

            {/* <Select
              size="middle"
              defaultValue="1"
              // onChange={handleChange}
              style={{ width: 200 }}
              options={dataDay}
            />
            <Select
              size="middle"
              defaultValue="1"
              // onChange={handleChange}
              style={{ width: 200, zIndex: 99999999999999999 }}
              options={dataMonth}
              // className="z-20"
            />
            <Select
              size="middle"
              defaultValue="2023"
              // onChange={handleChange}
              style={{ width: 200 }}
              options={dataYear}
            /> */}
          </div>
        </div>

        <div className="form-register-row-select mt-3">
          <span className="form-register-row-title flex gap-1">
            <p className="text-xs font-semibold">Giới tính</p>
            <AiFillQuestionCircle />
          </span>
          <div className="flex gap-3 mt-2 justify-between">
            <div className="wrap-radio-gender">
              Nữ
              <input type="radio" value="Male" name="gender" />
            </div>
            <div className="wrap-radio-gender">
              Nam
              <input type="radio" value="Female" name="gender" />
            </div>
            <div className="wrap-radio-gender">
              Khác
              <input type="radio" value="Other" name="gender" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-register-footer mt-3">
        <p className="text-xs">
          Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
          của bạn lên Facebook.
          <Link href="#" className="text-blue-900">
            Tìm hiểu thêm
          </Link>
        </p>
        <p className="text-xs mt-3">
          Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
          quyền riêng tư và Chính sách cookie của chúng tôi. Bạn có thể nhận
          được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
        </p>

        <div className="wrap-btn-register flex items-center justify-center my-4">
          <button
            onClick={handleSignUp}
            className="bg-green-600 text-white py-2 px-12 font-bold rounded-lg hover:bg-green-800 transition-all ease-out"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
