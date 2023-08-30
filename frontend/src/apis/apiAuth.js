import axios from "../axios";

const apiSignIn = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/signin`,
    data,
    { withCredentials: true }
  );
  return response;
};

const apiSignUp = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/signup`,
    data,
    { withCredentials: true }
  );
  return response;
};

export { apiSignIn, apiSignUp };
