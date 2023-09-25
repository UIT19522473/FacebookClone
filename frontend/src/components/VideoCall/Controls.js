import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { HiPhoneMissedCall } from "react-icons/hi";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";

const Controls = () => {
  const navigate = useNavigate();
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  // const controllMeetingRedux = useSelector((state) => state.controllMeeting);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);

  const handleLeave = () => {
    leave();
    navigate("/");
  };

  const handleToggleMic = () => {
    toggleMic();
    setMic(!mic);
  };

  const handleToggleWebcam = () => {
    toggleWebcam();
    setCamera(!camera);
  };

  useEffect(() => {}, []);

  return (
    <div className="flex gap-4 absolute -bottom-[80px] items-center justify-center w-full">
      <button
        className="p-3 bg-blue-600 rounded-full"
        onClick={handleToggleMic}
      >
        {mic ? (
          <BsMicFill size={32} color="white" />
        ) : (
          <BsFillMicMuteFill size={32} color="white" />
        )}
      </button>
      <button
        className="p-3 bg-green-600 rounded-full"
        onClick={handleToggleWebcam}
      >
        {camera ? (
          <BsFillCameraVideoFill size={32} color="white" />
        ) : (
          <BsFillCameraVideoOffFill size={32} color="white" />
        )}
      </button>
      <button className="p-3 bg-red-600 rounded-full" onClick={handleLeave}>
        <HiPhoneMissedCall size={32} color="white" />
      </button>
    </div>
  );
};

export default Controls;
