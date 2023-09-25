import axios from "../axios";

const apiSubmitPost = async (data) => {
  // console.log("api", data.data.get("image"));
  const { token, content } = data;
  const formData = new FormData();
  formData.append("img", content?.img);
  formData.append("desc", content?.desc);

  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/post`,
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

const apiGetAllPost = async (data) => {
  // console.log("api", data.data.get("image"));
  const { token } = data;

  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/post`,

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

const apiGetPostById = async (data) => {
  // console.log("api", data.data.get("image"));
  const { token, id } = data;

  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/post/${id}`,

    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );
  return response;
}; export { apiSubmitPost, apiGetAllPost, apiGetPostById };
