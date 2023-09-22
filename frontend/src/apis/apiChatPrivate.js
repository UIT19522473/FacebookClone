import axios from "../axios";

const apiCreateChatPrivate = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/create-mess-private`,
    data,
    { withCredentials: true }
  );
  return response;
};

const apiGetChatPrivate = async (data) => {
  // console.log(data);
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/get-mess-private`,
    {
      params: data,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: token,
      },
    }
  );
  return response;
};

export { apiCreateChatPrivate, apiGetChatPrivate };
