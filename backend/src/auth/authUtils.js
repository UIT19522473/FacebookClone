const jwt = require("jsonwebtoken");
const { AuthFailureError, ForbiddenError } = require("../core/error.response");
const { findUserById } = require("../services/user.service");
const { getInfoData } = require("../utils");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const HEADER = {
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "refreshtoken",
};

const createTokenPair = async (payload, privateKey) => {
  try {
    //accessToken
    const accessToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });
    //refreshToken
    const refreshToken = await jwt.sign({ _id: payload._id }, privateKey, {
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  } catch (err) {}
};

const renewToken = async (req, res, next) => {
  const refreshToken = req.headers[HEADER.REFRESHTOKEN];
  if (!refreshToken) throw new ForbiddenError("Invalid Request");

  try {
    const decodeUser = jwt.verify(refreshToken, PRIVATE_KEY);
    if (decodeUser) throw new ForbiddenError("Invalid User");
    const user = await findUserById(decodeUser._id);
    const payload = getInfoData({
      fields: ["_id", "name", "email"],
      object: user,
    });
    const accessToken = await jwt.sign(payload, PRIVATE_KEY, {
      expiresIn: "2 days",
    });
    return accessToken;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createTokenPair,
  renewToken,
};
