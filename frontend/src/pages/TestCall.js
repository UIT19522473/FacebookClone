import "../App.css"
import React, { useState } from "react"
import {
    MeetingProvider
} from "@videosdk.live/react-sdk"
import { authToken, createMeeting } from "../apis/apiCall"
import MeetingView from "../components/VideoCall/MeetingView"

function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
    const onClick = async () => {
        await getMeetingAndToken(meetingId);
    };
    return (
        <div >
            <input
                type="text"
                placeholder="Enter Meeting Id"
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
            />
            <button onClick={onClick}>Join</button>
            {" or "}
            <button onClick={onClick}>Create Meeting</button>
        </div>
    );
}

const TestCall = () => {
    const [meetingId, setMeetingId] = useState(null);

    //Getting the meeting id by calling the api we just wrote
    const getMeetingAndToken = async (id) => {
        const meetingId =
            id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);
    };

    //This will set Meeting Id to null when meeting is left or ended
    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    return authToken && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: "C.V. Raman",
            }}
            token={authToken}
        >
            <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    );
};

export default TestCall;
