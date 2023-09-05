import React, { useState } from "react";
import "../../styles/home/postcard.css";

import { useSelector, useDispatch } from "react-redux";
import { apiCommentChild } from "../../apis/apiComment";
import { getAllPosts } from "../../features/post/postAsync";

const CommentChild = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.data);
  const [openWrite, setOpenWrite] = useState(false);
  const [cmtChild, setCmtChild] = useState("");
  // const { author, content, replies, cmt } = props;
  const { parentId, child, postId } = props;
  //   parentId={cmt?._id}
  //   postId={postId}
  //   child={item}
  const inforAuth = useSelector((state) => state.auth?.data);

  //reply comment
  const handleSendCmtChild = async () => {
    const content = {
      parentId: parentId,
      text: cmtChild,
      postId: postId,
      reply: child?.userId?._id,
    };
    //   console.log(content);

    await apiCommentChild({
      content,
      token: inforAuth?.tokens?.accessToken,
    });

    dispatch(getAllPosts({ token: inforAuth?.tokens?.accessToken }));
  };
  return (
    <div className="mt-2">
      <div className="comment-user flex items-center gap-1">
        <img
          className="w-10 h-10 rounded-full"
          src={child?.userId?.img}
          alt="logo"
        />
        <div className="comemnt-user-title">
          <div className="wrap-comment-user">
            <p className="text-white">{child?.userId?.name}</p>

            {!child?.commentsChild?.length === 0 ? (
              <p className="text-white font-normal text-sm">{child?.text}</p>
            ) : (
              <span className="flex items-center gap-1">
                <p className="text-white font-bold">{child?.reply?.name}</p>
                <p className="text-white font-normal text-sm"> {child?.text}</p>
              </span>
            )}

            {/* <p className="text-white font-normal text-sm">
              {!child?.commentsChild?.length === 0
                ? child?.text
                : child?.reply?.name + " " + child?.text}
            </p> */}
          </div>
          <div className="wrap-comment-user-controller flex items-center gap-3">
            <p className="font-normal">5 gio</p>
            <button className="btn-user-controller">Thích</button>
            <button
              onClick={() => setOpenWrite(!openWrite)}
              className="btn-user-controller"
            >
              Phản hồi
            </button>
          </div>
        </div>
      </div>

      {openWrite ? (
        <div className="flex items-center comment-user-write mt-3 gap-1">
          <img className="w-8 rounded-full" src={auth?.user?.img} alt="" />
          <span className="flex items-center gap-1 comment-user-write-input w-full">
            <p className="bg-blue-900 text-white px-1">{child?.userId?.name}</p>
            <input
              value={cmtChild}
              onChange={(e) => setCmtChild(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 break-words"
              type="text"
            />
            <button
              onClick={handleSendCmtChild}
              className="ml-auto flex items-center comment-user-write-btn-send"
            >
              <span className="material-symbols-outlined text-lg font-bold">
                send
              </span>
            </button>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentChild;
