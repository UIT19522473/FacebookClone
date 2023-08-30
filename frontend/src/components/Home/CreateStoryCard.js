import React from "react";
import "../../styles/home/storycard.css";

const CreateStoryCard = () => {
  return (
    <div className="wrap-create-story-card">
      <div className="create-story-card">
        <div className="image-wrapper rounded-t-xl">
          <img
            className="w-full"
            src="https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg"
            alt="logo"
          />
        </div>
      </div>
      <div className="wrap-btn-create-story">
        <button className="btn-create-story">
          <span className="material-symbols-outlined create-story-icon-add text-center">
            add
          </span>
          <p className="text-sm">Tạo tin</p>
        </button>
      </div>
    </div>
  );
};

export default CreateStoryCard;
