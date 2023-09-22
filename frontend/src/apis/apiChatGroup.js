import axios from "../axios";

const apiCreateChatGroup = async (data) => {
  const { token, content } = data;
  const formData = new FormData();
  formData.append("img", content?.img);
  formData.append("name", content?.name);
  formData.append("members", content?.members);
  formData.append("historyChat", content?.historyChat);

  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/create-mess-group`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
};

const apiGetChatGroup = async (data) => {
  const { token, content } = data;
  // console.log({ token, content });

  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/get-group-chat`,
    {
      params: { idUser: content },
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
};

const apiSendMessChatGroup = async (data) => {
  const response = await axios.put(
    `${process.env.REACT_APP_URL_SERVER_API}/push-to-history`,
    data,
    { withCredentials: true }
  );
  return response;
};

const apiGetHistoryChatGroup = async (data) => {
  // console.log(data);
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/get-history-chat`,
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

export {
  apiCreateChatGroup,
  apiGetChatGroup,
  apiSendMessChatGroup,
  apiGetHistoryChatGroup,
};
