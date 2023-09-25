import React, { useEffect, useRef, useState } from "react";
import "../../styles/chat.css";
// import FacebookIcon from "../../images/facebook.svg";
import { MdCall, MdClose } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
// import { GrSubtract } from "react-icons/gr";
import { BsFileEarmarkImage } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import MessageReceive from "./MessageReceive";
import MessageSend from "./MessageSend";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authToken, createMeeting } from "../../apis/apiCall";

import {
  addHidden,
  removeDisplay,
} from "../../features/listchat/listchatSlice";

import { Dropdown } from "antd";
import ModalCustom from "../ModalCustom";
import { openGroupChatMembers } from "../../features/createGroupChat/createGroupChatSlice";
import MdMemberGroupChat from "./MdMemberGroupChat";

import {
  addToAllMess,
  removeCacheMess,
} from "../../features/chatPrivate/chatPriaveSlice";
import {
  apiCreateChatPrivate,
  apiGetChatPrivate,
} from "../../apis/apiChatPrivate";

// import { useQuery, QueryClientProvider, QueryClient } from "react-query";

import io from "socket.io-client";
import {
  apiGetHistoryChatGroup,
  apiSendMessChatGroup,
} from "../../apis/apiChatGroup";
import { removeCacheMessGroup } from "../../features/chatGroup/chatGroupSlice";
const socket = io(process.env.REACT_APP_URL_SERVER);

// const queryClient = new QueryClient();
// const fetchData = async () => {
//   const response = await apiGetChatPrivate({
//     idCommon: "64f0a3ca9ecb1088c3325624_64fab61c763da5135dcc9a68",
//   });
//   const data = await response?.data?.metadatas?.historyChat;
//   return data;
// };
const ChatBox = (props) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth?.data?.user);
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.groupChat.openMembers.open);
  const { user } = props;
  const chatRedux = useSelector(
    user.members
      ? (state) => state.chatGroup.allMess
      : (state) => state.chatPrivate.allMess
  );
  // const chatGroup = useSelector((state) => state.chatGroup.allMess);
  // const { data, isLoading, isError } = useQuery("myData", fetchData);
  useEffect(() => {
    if (user?.members) {
      dispatch(removeCacheMessGroup({ idGroupChat: user?._id }));
    } else {
      dispatch(removeCacheMess({ idSend: auth?._id, idReceive: user?._id }));
    }
  }, []);

  // console.log("log test", user);

  const idCommon = user.members
    ? "idGroupTest"
    : user?._id.localeCompare(auth?._id) < 0
    ? `${user?._id}_${auth?._id}`
    : `${auth?._id}_${user?._id}`;

  const [isLoading, setIsLoading] = useState(true);
  const [historyChat, setHistoryChat] = useState([]);
  useEffect(() => {
    const fetchHistoryChat = () => {
      if (!user.members) {
        apiGetChatPrivate({ idCommon })
          .then((response) => {
            return response?.data?.metadatas?.historyChat;
          })
          .then((data) => {
            setHistoryChat(data);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      } else {
        apiGetHistoryChatGroup({ idGroupChat: user?._id })
          .then((response) => {
            return response?.data?.metadatas?.historyChat;
          })
          .then((data) => {
            setHistoryChat(data);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      }
    };
    fetchHistoryChat();
  }, [dispatch, idCommon, user]);

  // const [mess, setMess] = useState("");
  const handleCloseMess = () => {
    dispatch(removeDisplay(user));
    dispatch(removeCacheMess({ idSend: auth?._id, idReceive: user?._id }));
    // console.log("hello");
  };

  const handleHiddenMess = () => {
    dispatch(addHidden(user));
  };

  const handleClickItem = (key) => {
    console.log(key);
  };

  //open modal members
  const handleOpenModalMembers = () => {
    dispatch(openGroupChatMembers(user));
  };

  //xu li nhan tin
  // const [idRoom, setIdRoom] = useState("");
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  const handleKeyPressSendMess = async (e) => {
    if (e.key === "Enter") {
      // Xử lý khi người dùng nhấn Enter ở đây
      // console.log(messages);
      // xu li tin nhan nhom va private
      if (!user.members) {
        socket.emit("chatMessage", {
          userSend: auth,
          userReceive: user,
          message: message,
          idRoom: `chatPrivate_${user?._id}`,
        });
        let messSend = message;
        setMessage("");

        const userSend = {
          _id: auth?._id,
          name: auth?.name,
          img: auth?.img,
          email: auth?.email,
        };
        const userReceive = {
          _id: user?._id,
          name: user?.name,
          img: user?.img,
          email: user?.email,
        };

        dispatch(
          addToAllMess({
            message: message,
            userSend: userSend,
            userReceive: user,
          })
        );

        await apiCreateChatPrivate({
          idCommon: idCommon,
          messDetail: {
            message: messSend,
            userSend: auth,
            userReceive: userReceive,
          },
        });

        messSend = "";
      } else {
        // { userSend, idGroupChat, members, message }
        socket.emit("chatGroupMessage", {
          userSend: auth,
          idGroupChat: user?._id,
          members: user?.members,
          message: message,
        });
        let messSend = message;
        setMessage("");

        const userSend = {
          _id: auth?._id,
          name: auth?.name,
          img: auth?.img,
          email: auth?.email,
        };

        await apiSendMessChatGroup({
          idGroupChat: user?._id,
          messDetail: {
            message: messSend,
            userSend: userSend,
            idGroupChat: user?._id,
          },
        });
      }
    }
  };
  const test = () => {
    console.log("test");
  };

  const handleCall = async () => {
    const meetingId = await createMeeting({ token: authToken });
    // console.log("testttt", meetingId);
    if (!user.members) {
      const dataUserReceive = {
        _id: user?._id,
        name: user?.name,
        img: user?.img,
        email: user?.email,
      };

      socket.emit("inviteCall", {
        userSend: auth,
        userReceive: dataUserReceive,
        meetingId: meetingId,
        idRoom: `call_${user?._id}`,
        type: "INVITE",
      });
    }

    navigate(
      `/test-call/${user?._id}/${
        user?.members ? "call-group" : "call-private"
      }?idRoom=${meetingId}&accept=pending`
    );
  };

  const dataGroupDropDown = [
    {
      label: (
        <button onClick={handleOpenModalMembers} className="p-2">
          Thành viên nhóm
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button onClick={() => handleClickItem(1)} className="p-2">
          Thay đổi ảnh
        </button>
      ),
      key: "1",
    },

    {
      label: (
        <button onClick={() => handleClickItem(2)} className="p-2">
          Đổi tên nhóm
        </button>
      ),
      key: "2",
    },
    {
      label: (
        <button onClick={() => handleClickItem(3)} className="p-2">
          Thêm thành viên
        </button>
      ),
      key: "3",
    },
    {
      label: (
        <button onClick={() => handleClickItem(4)} className="p-2">
          Rời nhóm
        </button>
      ),
      key: "4",
    },
  ];

  const dataFriendDropDown = [
    {
      label: (
        <button onClick={() => handleClickItem(0)} className="p-2">
          Xem trang cá nhân
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button onClick={() => handleClickItem(1)} className="p-2">
          Biệt danh
        </button>
      ),
      key: "1",
    },

    {
      label: (
        <button onClick={() => handleClickItem(2)} className="p-2">
          Chặn người dùng
        </button>
      ),
      key: "2",
    },
  ];

  const dropdowRef = useRef(null);
  const handleOpenDropdown = () => {
    dropdowRef.current.click();
  };

  const chatContainerRef = useRef(null);

  // Mỗi khi messages thay đổi, cuộn xuống dưới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatRedux, historyChat]);

  return (
    <div className="chat-box">
      {openModal ? (
        <ModalCustom type="OPENMEMBERSCHAT" open={openModal}>
          <MdMemberGroupChat />
        </ModalCustom>
      ) : (
        <></>
      )}
      <div className="chat-box-header flex items-center justify-between">
        <span
          onClick={() => handleOpenDropdown()}
          className="chat-box-info flex items-center gap-2 cursor-pointer relative"
        >
          <img className="w-10 h-10 rounded-full" src={user?.img} alt="icon" />
          <div className="chat-box-infor-user">
            <Dropdown
              className="absolute -top-[10px] -left-[122%]"
              menu={
                user.members
                  ? { items: dataGroupDropDown }
                  : { items: dataFriendDropDown }
              }
              trigger={["click"]}
            >
              <button ref={dropdowRef} onClick={(e) => e.preventDefault()} />
            </Dropdown>
            <p className="chat-box-infor-user-name text-sm font-semibold">
              {user?.name}
            </p>
            <p className="chat-box-infor-user-status text-xs">Đang hoạt động</p>
          </div>
        </span>
        <span className="chat-box-controller flex items-center gap-2">
          <button className="chat-box-btn-controller" onClick={handleCall}>
            <MdCall size={22} />
          </button>
          <button className="chat-box-btn-controller">
            <FaVideo size={22} />
          </button>
          <button
            onClick={handleHiddenMess}
            className="chat-box-btn-controller"
          >
            <span className="material-symbols-outlined font-bold">remove</span>
          </button>
          <button onClick={handleCloseMess} className="chat-box-btn-controller">
            <MdClose size={22} />
          </button>
        </span>
      </div>
      <div ref={chatContainerRef} className="chat-box-body">
        {isLoading ? (
          <>
            <p>loading...</p>
          </>
        ) : (
          <>
            {historyChat?.map((item, index) => {
              if (!item.idGroupChat) {
                if (
                  item?.userSend?._id === auth?._id &&
                  item?.userReceive?._id === user?._id &&
                  item?.message !== ""
                ) {
                  return <MessageSend key={index} mess={item?.message} />;
                } else if (
                  item?.userSend?._id === user?._id &&
                  item?.message !== ""
                ) {
                  return (
                    <MessageReceive
                      key={index}
                      mess={item?.message}
                      user={item?.userSend}
                    />
                  );
                }
              } else {
                if (
                  item?.userSend?._id === auth?._id &&
                  item?.idGroupChat === user?._id &&
                  item?.message !== ""
                ) {
                  return <MessageSend key={index} mess={item?.message} />;
                } else if (
                  item?.userSend?._id !== auth?._id &&
                  item?.idGroupChat === user?._id &&
                  item?.message !== ""
                ) {
                  return (
                    <MessageReceive
                      key={index}
                      mess={item?.message}
                      user={item?.userSend}
                    />
                  );
                }
              }
            })}
          </>
        )}

        {chatRedux?.map((item, index) => {
          if (!item.idGroupChat) {
            if (
              item?.userSend?._id === auth?._id &&
              item?.userReceive?._id === user?._id &&
              item?.message !== ""
            ) {
              return <MessageSend key={index} mess={item?.message} />;
            } else if (
              item?.userSend?._id === user?._id &&
              item?.message !== ""
            ) {
              return (
                <MessageReceive
                  key={index}
                  mess={item?.message}
                  user={item?.userSend}
                />
              );
            }
          } else {
            if (
              item?.userSend?._id === auth?._id &&
              item?.idGroupChat === user?._id &&
              item?.message !== ""
            ) {
              return <MessageSend key={index} mess={item?.message} />;
            } else if (
              item?.userSend?._id !== auth?._id &&
              item?.idGroupChat === user?._id &&
              item?.message !== ""
            ) {
              return (
                <MessageReceive
                  key={index}
                  mess={item?.message}
                  user={item?.userSend}
                />
              );
            }
          }
        })}
      </div>

      <div className="chat-box-footer">
        <button className="chat-box-btn-footer">
          <BsFileEarmarkImage size={22} />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPressSendMess}
          className="chat-box-input"
          placeholder="Aa"
          type="text"
        />
        <button className="chat-box-btn-footer">
          <AiFillLike size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
