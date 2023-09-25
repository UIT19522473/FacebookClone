import React, { useEffect } from "react";
import "../../styles/home/content.css";
import { BiSolidVideoPlus } from "react-icons/bi";
import { FaImages } from "react-icons/fa";
import { BsFillEmojiLaughingFill } from "react-icons/bs";

// import ImgFacebook from "../../images/facebook.svg";
import PostCard from "./PostCard";
import Slider from "react-slick";
import { settingStory } from "../../helps/settingSlider";
import CreateStoryCard from "./CreateStoryCard";
import StoryCard from "./StoryCard";
// import Modal from "../ModalTailWind";
// import Register from "../Register";
import CreatePost from "./CreatePost";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../features/post/postAsync";

import { openCreatePost } from "../../features/createPost/createPostSlice";
import ModalCustom from "../ModalCustom";
// import { apiGetAllPost } from "../../apis/apiPost";

const Content = () => {
  const dispatch = useDispatch();
  const openPost = useSelector((state) => state.createPost.open);
  const auth = useSelector((state) => state.auth?.data?.user);
  const token = useSelector((state) => state.auth?.data?.tokens?.accessToken);
  const posts = useSelector((state) => state.post?.data);

  // const checkAPost = useSelector((state) => state.post?.data?.postCurrent);

  // const [open, setOpen] = useState(false);
  const handleOpenCreatePost = () => {
    // setOpen(true);
    dispatch(openCreatePost());
  };

  useEffect(() => {
    dispatch(getAllPosts({ token: token }));
  }, [token, dispatch]);

  console.log(posts);

  // const [openTest, setOpenTest] = useState(false);

  return (
    <div className="home-content mt-3">
      {/* {open ? (
        <Modal open={open} setOpen={setOpen}>
          <CreatePost />
        </Modal>
      ) : (
        <></>
      )} */}

      {openPost ? (
        <ModalCustom type="CREATEPOST" open={openPost}>
          <CreatePost />
        </ModalCustom>
      ) : (
        <></>
      )}
      <section className="home-stories">
        <div>
          {/* <h2> Single Item</h2> */}
          <Slider {...settingStory}>
            <CreateStoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
            <StoryCard />
          </Slider>
        </div>
      </section>
      <section className="home-mypost -mt-4">
        <div className="home-mypost-wrap-title flex gap-2 items-center">
          <div className="mypost-title-avatar ">
            <img className="" src={auth?.img} alt="logo" />
          </div>

          <button
            onClick={handleOpenCreatePost}
            className="mypost-title-text flex-1"
          >
            <p className="w-full bg-transparent text-start mypost-btn-thinking">
              {auth?.name}, ban dang nghi gi the?
            </p>
          </button>
        </div>
        <div className="home-mypost-wrap-option flex items-center justify-between mt-2 px-3">
          <button className="mypost-option mypost-option-stream flex items-center gap-1">
            <BiSolidVideoPlus color="#f02849" size={32} />
            <p>Video truc tiep</p>
          </button>
          <button className="mypost-option mypost-option-image flex items-center gap-1">
            <FaImages color="green" size={28} />
            <p>Anh/Video</p>
          </button>
          <button className="mypost-option mypost-option-activity flex items-center gap-1">
            <BsFillEmojiLaughingFill color="yellow" size={26} />
            <p>Cam xuc/hoat dong</p>
          </button>
        </div>
      </section>
      <section className="home-common-post">
        {posts ? (
          posts?.map((post, index) => <PostCard post={post} key={index} />)
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default Content;
