import React from "react";
import NavigationFriends from "./NavigationFriends";
import FriendCard from "./FriendCard";

const MyFriends = () => {
  return (
    <div className="wrap-myfriends">
      <h1 className="ml-2 text-2xl font-bold mb-2 ">Bạn bè</h1>
      <NavigationFriends />
      <div className="wrap-myfriends-content grid grid-cols-2 gap-1 px-4 mt-4">
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
      </div>
    </div>
  );
};

export default MyFriends;
