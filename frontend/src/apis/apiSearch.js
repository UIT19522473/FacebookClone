import axios from "../axios";

const apiGetUsers = async (data) => {
  const { token, content } = data;

  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/search`,

    {
      params: content,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
};

const apiGetUserCalled = async (data) => {
  const { token, content } = data;

  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/get-user-called`,

    {
      params: content,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
};

export { apiGetUsers, apiGetUserCalled };
