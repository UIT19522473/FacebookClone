import React, { useEffect, useState } from "react";
// import IconFacebook from "../../images/facebook.svg";
import "../../styles/home/postcard.css";
import { BsThreeDots, BsEmojiLaughing } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineCamera,
  AiOutlineFileGif,
} from "react-icons/ai";
import { LuMessageSquare, LuSticker } from "react-icons/lu";
import { CiChat2 } from "react-icons/ci";
import { PiShareFat } from "react-icons/pi";

import CommentUser from "./CommentUser";
import { useSelector, useDispatch } from "react-redux";
import { apiCommentParent } from "../../apis/apiComment";
import { getAllPosts } from "../../features/post/postAsync";

//change time
import moment from "moment";
import { io } from "socket.io-client";
import { apiGetPostById } from "../../apis/apiPost";

const socket = io(process.env.REACT_APP_URL_SERVER);


const PostCard = (props) => {
  const dispatch = useDispatch();
  //const { post } = props;
  const [post, setPost] = useState(props.post);
  useEffect(() => {
    if (post) socket.on(`${post._id}`, async () => {
      const postCurrent = await apiGetPostById({
        token: inforAuth?.tokens?.accessToken,
        id: post._id
      });
      //console.log('Post current ', postCurrent.data.metadata.post)
      setPost(postCurrent.data.metadata.post);
    })
  }, [])

  const auth = useSelector((state) => state.auth?.data?.user);
  const inforAuth = useSelector((state) => state.auth?.data);

  //convert time
  const now = moment();
  const targetTime = moment(post?.createdAt);
  const duration = moment.duration(now.diff(targetTime));

  // Định dạng khoảng thời gian
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let formattedDuration = "";

  // Kiểm tra và hiển thị số ngày nếu có
  if (days > 0) {
    formattedDuration = `${days} ngày`;
  } else if (hours > 0) {
    formattedDuration = `${hours} giờ`;
  } else if (minutes > 0) {
    formattedDuration = `${minutes} phút`;
  } else {
    formattedDuration = `${seconds} giây`;
  }

  // --------------

  const [comment, setComment] = useState("");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      // Xử lý logic sau khi người dùng nhấn Enter

      await apiCommentParent({
        content: {
          text: comment,
          postId: post?._id,
        },
        token: inforAuth?.tokens?.accessToken,
      });
      console.log('call 1');
      socket.emit('call-notify', ({ email: post.userId.email, text: 'đã phản hồi bài viết', name: auth.name, emailSend: auth.email }))
      socket.emit('update-post', ({ id: post._id }));
      dispatch(getAllPosts({ token: inforAuth?.tokens?.accessToken }));
    }
  };

  return (
    <div className="post-card mt-4">
      <div className="post-card-header flex ">
        <div className="post-card-header-avatar">
          <img
            className="w-12 h-12 rounded-full"
            src={post?.userId?.img}
            alt="logo"
          />
        </div>
        <div className="post-card-header-info ml-2">
          <p className="text-xl">{post?.userId?.name}</p>
          <p className="text-xs text-gray-400">{formattedDuration}</p>
        </div>
        <div className="post-card-header-control ml-auto flex items-center gap-3">
          <div className="header-control-more">
            <BsThreeDots size={24} />
          </div>
          <div className="header-control-close">
            <IoMdClose size={24} />
          </div>
        </div>
      </div>
      <div className="post-card-body mt-2">
        <div className="post-card-body-cap mb-4">{post?.desc}</div>
        <div className="post-card-body-img flex justify-center items-center">
          {post?.img ? (
            <img className="w-full" src={post?.img} alt="logo" />
          ) : (
            <></>
          )}
        </div>
        <div className="post-card-body-description flex justify-between px-3 mt-2">
          <div className="post-card-viewlike flex items-center gap-1">
            <div className="wrap-icon-like text-white ">
              <AiFillLike size={12} />
            </div>

            <p className="font-normal">2</p>
          </div>

          <div className="post-card-viewmess flex items-center gap-1 ">
            <p className="font-normal">2</p>
            <div className="mess">
              <LuMessageSquare size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="post-card-footer">
        <div className="post-card-footer-controller flex items-center justify-around -mx-6 mb-2">
          <button className="flex items-center gap-2">
            <AiOutlineLike size={20} />
            <p>thich</p>
          </button>
          <button className="flex items-center gap-2">
            <CiChat2 size={20} />
            <p>Binh luan</p>
          </button>
          <button className="flex items-center gap-2">
            <PiShareFat size={20} />
            <p>Chia se</p>
          </button>
        </div>

        <div className="post-card-footer-view-comment">
          <button className="btn-more-comment text-sm">
            Xem them binh luan
          </button>
          <ul className="post-card-footer-comment mt-2 gap-3 flex flex-col">
            {post?.commentsId ? (
              post?.commentsId.map((item, index) => (
                <li key={index}>
                  <CommentUser cmt={item} postId={post?._id} />
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
          <div className="wrap-write-comment mt-4 flex items-center gap-1">
            <img
              className="w-10 h-10 rounded-full"
              src={auth?.img}
              alt="logo"
            />
            <div className="wrap-write-comment-text flex items-center">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent border-none outline-none px-1 w-full"
                type="text"
                placeholder="Viet binh luan..."
              />
              <div className="comment-text-controller flex items-center gap-3">
                <button
                  title="chen mot bieu tuong cam xuc"
                  className="flex items-center text-center"
                >
                  <BsEmojiLaughing size={18} />
                </button>
                <button
                  title="dinh kem mot anh hoac video"
                  className="flex items-center text-center"
                >
                  <AiOutlineCamera size={20} />
                </button>
                <button
                  title="binh luan bang file Gif"
                  className="flex items-center text-center"
                >
                  <AiOutlineFileGif size={18} />
                </button>
                <button
                  title="binh luan bang nhan dan"
                  className="flex items-center text-center"
                >
                  <LuSticker size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
