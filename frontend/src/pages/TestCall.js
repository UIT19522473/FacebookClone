import "../App.css";
import React, { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../apis/apiCall";
import MeetingView from "../components/VideoCall/MeetingView";

import { useLocation, useNavigate } from "react-router-dom";



function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  // const [idMeetingRoom, setIdMeetingRoom] = ("")
  const onClick = async () => {
    const response = await getMeetingAndToken(meetingId);
    // console.log("testJoinScreen", response);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button className="text-white" onClick={onClick}>
        Join
      </button>
      {" or "}
      <button className="text-white" onClick={onClick}>
        Create Meeting
      </button>
    </div>
  );
}

const ScreenWaiting = () => {
  return <div>hello</div>;
};

const TestCall = () => {
  const navigate = useNavigate();

  const search = window.location.search;
  const idRoom = new URLSearchParams(search).get("idRoom");

  const [meetingId, setMeetingId] = useState(null);
  // const [openMic, setOpenMic] = useState(true);
  // const [openCamera, setOpenCamera] = useState(false);

  // Sử dụng useParams để lấy các params từ URL
  // const { idCall } = useParams();

  //Getting the meeting id by calling the api we just wrote
  // const getMeetingAndToken = async (id) => {
  //   const meetingId =
  //     id == null ? await createMeeting({ token: authToken }) : id;
  //   setMeetingId(meetingId);
  //   return meetingId;
  // };

  // useEffect(() => {
  //   getMeetingAndToken();
  // }, []);
  // // console.log("idCall", idCall);
  // navigate(`?idRoom=${meetingId}`);

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return (
    <div className="h-[85vh] flex flex-col">
      {authToken && idRoom ? (
        <MeetingProvider
          config={{
            meetingId: idRoom,
            micEnabled: true,
            webcamEnabled: true,
            name: "C.V. Raman",
          }}
          token={authToken}
        >
          <MeetingView
            // setOpenMic={setOpenMic}
            // setOpenCamera={setOpenCamera}
            meetingId={idRoom}
            onMeetingLeave={onMeetingLeave}
          />
        </MeetingProvider>
      ) : (
        // <JoinScreen getMeetingAndToken={getMeetingAndToken} />
        // <ScreenWaiting>hello</ScreenWaiting>
        <p className="text-white">hellossssssssssssssssssssss</p>
      )}
    </div>
  );
};

export default TestCall;
