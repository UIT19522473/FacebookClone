import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useEffect, useState } from "react";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";

import { useParams } from "react-router-dom";
import { apiGetUserCalled } from "../../apis/apiSearch";
import { useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { HiPhoneMissedCall } from "react-icons/hi";

import io from "socket.io-client";
const socket = io(process.env.REACT_APP_URL_SERVER);

const MeetingView = (props) => {
  const navigate = useNavigate();

  const search = window.location.search;
  const acceptQuery = new URLSearchParams(search).get("accept");

  const [agreeJoinCall, setAgreeJoinCall] = useState(false);

  const { idUser, typeCall } = useParams();

  const [userCalled, setUserCalled] = useState(null);

  const [joined, setJoined] = useState(null);
  const [statusJoined, setStatusJoined] = useState(false);

  const auth = useSelector((state) => state.auth?.data?.user);

  // console.log(accept);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();

    setStatusJoined(true);
  };

  const acessToken = useSelector(
    (state) => state.auth?.data?.tokens?.accessToken
  );

  useEffect(() => {
    if (agreeJoinCall) {
      joinMeeting();
    }
  }, [agreeJoinCall]);

  useEffect(() => {
    if (acceptQuery === "true") {
      setAgreeJoinCall(true);
    }

    if (acceptQuery === "pending") {
      socket.emit("joinRoom", {
        idUser: auth?._id,
      });

      socket.on(`acceptCallReceived`, (data) => {
        const { userSend, userReceive, meetingId, accept } = data;
        if (accept) {
          // joinMeeting();
          setAgreeJoinCall(true);
        }
      });
    }
  }, [acceptQuery, auth?._id]);

  useEffect(() => {
    const fetchDataUserCalled = async () => {
      const response = await apiGetUserCalled({
        token: acessToken,
        content: {
          idUser: idUser,
          typeCall: typeCall === "call-group" ? "group" : "private",
        },
      });
      // console.log(response);
      setUserCalled(response.data.metadata);
    };
    fetchDataUserCalled();
  }, [acessToken, idUser, typeCall]);

  return (
    <div className="flex items-center justify-center flex-1">
      {/* <h3 className="text-white">Meeting Id: {props.meetingId}</h3> */}
      {joined && joined === "JOINED" ? (
        <div className="relative">
          <Controls />
          <div
            className={`grid grid-cols-2 gap-12 h-[700px] overflow-y-scroll`}
          >
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                numMembers={participants.size}
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        </div>
      ) : joined && joined === "JOINING" ? (
        <div className="wrap-meeting-waiting text-white">
          <p className="text-white">Joining the meeting...</p>
        </div>
      ) : (
        // <button className="text-white" onClick={joinMeeting}>
        //   Join
        // </button>
        <></>
      )}

      {!statusJoined && (
        <div className="wrap-meeting-waiting-img-user w-60 h-60">
          <img
            className="w-full h-full rounded-full"
            src={userCalled?.img}
            alt="logo"
          />
          <p className="text-center mt-4 text-white text-3xl font-bold">
            {userCalled?.name}
          </p>
          <p className="text-center mt-2 text-slate-400 text-sm font-semibold">
            Đang gọi...
          </p>

          <div className="wrap-meeting-controller text-white mt-12 flex justify-center items-center gap-12">
            {/* <button>camera</button>
        <button>mic</button> */}
            <button
              // onClick={onMeetingLeave}
              className="p-4 bg-red-600 rounded-full"
            >
              <HiPhoneMissedCall size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingView;
