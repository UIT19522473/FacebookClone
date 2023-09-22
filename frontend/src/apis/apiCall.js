import axios from "../axios";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0ZDQ0OGY3Ny1mNDgyLTQzMDctYWZkOS05ZWZmZGNiYWRlY2UiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5NTI2MDgzMiwiZXhwIjoxODUzMDQ4ODMyfQ.fQgqDTu4bVzsqXZX_dhVFAcBL6i359X711RIi4ajSro";

const createMeeting = async ({ token }) => {
    const response = await axios.post(
        "https://api.videosdk.live/v2/rooms",
        {},
        {
            headers: {
                authorization: `${authToken}`,
                "Content-Type": "application/json",
            },
        })
    const { roomId } = response.data;
    return roomId;
};


export { authToken, createMeeting };
