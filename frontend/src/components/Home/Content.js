import React from "react";
import "../../styles/home/content.css";
import { BiSolidVideoPlus } from "react-icons/bi";
import { FaImages } from "react-icons/fa";
import { BsFillEmojiLaughingFill } from "react-icons/bs";

import ImgFacebook from "../../images/facebook.svg";
import PostCard from "./PostCard";
import Slider from "react-slick";
import { settingStory } from "../../helps/settingSlider";
import CreateStoryCard from "./CreateStoryCard";
import StoryCard from "./StoryCard";

const Content = () => {
  return (
    <content className="home-content">
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
        <div className="home-mypost-wrap-title flex gap-3 items-center">
          <div className="mypost-title-avatar">
            <img className="w-14 h-14" src={ImgFacebook} alt="logo" />
          </div>
          <div className="mypost-title-text w-full">
            <button className="w-full bg-transparent text-start mypost-btn-thinking">
              Tuan oi, ban dang nghi gi the?
            </button>
          </div>
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
        <PostCard />
        <PostCard />
      </section>
    </content>
  );
};

export default Content;
