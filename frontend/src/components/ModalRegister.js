import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import "../styles/modalregister.css";
import { AiFillQuestionCircle } from "react-icons/ai";

import { Select } from "antd";
import { dataDay, dataMonth, dataYear } from "../helps/dataBirthDay";

export default function ModalRegister(props) {
  const { open, setOpen } = props;
  //   const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div> */}
                <div className="wrap-form-register">
                  <div className="form-register-header flex justify-between">
                    <span>
                      <h1 className="text-3xl font-bold">Đăng ký</h1>
                      <p className="mt-1">Nhanh chóng và dễ dàng</p>
                    </span>
                    <button
                      onClick={() => setOpen(!open)}
                      className="form-register-btn-close mb-3"
                    >
                      <span class="material-symbols-outlined font-extrabold">
                        close
                      </span>
                    </button>
                  </div>
                  <div className="form-register-body">
                    <div className="form-register-row-input">
                      <input type="text" name="" id="" placeholder="Họ" />
                      <input type="text" name="" id="" placeholder="Tên" />
                    </div>
                    <div className="form-register-row-input">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Số di động hoặc email"
                      />
                    </div>
                    <div className="form-register-row-input">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Mật khẩu mới"
                      />
                    </div>

                    <div className="form-register-row-select mt-3">
                      <span className="form-register-row-title flex gap-1">
                        <p className="text-xs font-semibold">Ngày sinh</p>
                        <AiFillQuestionCircle />
                      </span>
                      <div className="flex gap-3 mt-2">
                        <Select
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
                          style={{ width: 200 }}
                          options={dataMonth}
                        />
                        <Select
                          size="middle"
                          defaultValue="2023"
                          // onChange={handleChange}
                          style={{ width: 200 }}
                          options={dataYear}
                        />
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
                      Những người dùng dịch vụ của chúng tôi có thể đã tải thông
                      tin liên hệ của bạn lên Facebook.
                      <a href="#" className="text-blue-900">
                        {" "}
                        Tìm hiểu thêm
                      </a>
                    </p>
                    <p className="text-xs mt-3">
                      Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản,
                      Chính sách quyền riêng tư và Chính sách cookie của chúng
                      tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS
                      và hủy nhận bất kỳ lúc nào.
                    </p>

                    <div className="wrap-btn-register flex items-center justify-center my-4">
                      <button className="bg-green-600 text-white py-1 px-12 font-bold rounded-lg hover:bg-green-800 transition-all ease-out">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
