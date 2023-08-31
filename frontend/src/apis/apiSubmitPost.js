import axios from "../axios";

const apiSubmitPost = async (data) => {
  // console.log("api", data.data.get("image"));
  const { token, ...restData } = data;
  console.log(restData);
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/post`,
    restData,
    // { desc: "mo mo mo" },
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

export { apiSubmitPost };
