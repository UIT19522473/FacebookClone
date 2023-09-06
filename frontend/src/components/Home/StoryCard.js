import React from "react";
import "../../styles/home/storycard.css";
import ItemUserNavRight from "./ItemUserNavRight";

const StoryCard = () => {
  return (
    <div className="wrap-story-card">
      <div className="story-card ">
        <div className="image-story-wrapper rounded-full h-full">
          <img
            className="w-full h-full img-story"
            src="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
            alt="logo"
          />
        </div>
        <div className="story-card-avatar">
          <ItemUserNavRight img="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg" />
        </div>
        <p className="story-card-name text-sm">Tuan nguyen</p>
      </div>
    </div>
  );
};

export default StoryCard;
