import axios from "../axios";

const apiCommentParent = async (data) => {
  const { token, content } = data;
  console.log(data);
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/comment`,
    content,
    {
      withCredentials: true,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
};

const apiCommentChild = async (data) => {
  const { token, content } = data;
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/comment`,
    content,
    {
      withCredentials: true,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
};
export { apiCommentParent, apiCommentChild };
