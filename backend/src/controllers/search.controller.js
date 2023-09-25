const { CREATED, OK } = require("../core/success.response");
const groupChatModel = require("../models/groupChat.model");
const userModel = require("../models/user.model");
const PostService = require("../services/post.service");

class SearchController {
  getUsers = async (req, res, next) => {
    const { idU, name } = req.query;
    // console.log(idU, name);

    const dynamicQuery = {};

    if (idU) {
      dynamicQuery._id = idU;
    }
    if (name) {
      dynamicQuery.name = { $regex: name, $options: "i" };
    }
    new OK({
      message: "Get list user success",
      metadata: await userModel.find(dynamicQuery),
      //   metadata: await userModel.find({ _id: "64f09ef1ba02976f5151cb32" }),
    }).send(res);
  };

  getUserCalled = async (req, res) => {
    const { idUser, typeCall } = req.query;
    if (typeCall === "private") {
      const response = await userModel
        .findById(idUser)
        .select(["_id", "name", "img"]);
      return res.status(200).json({ metadata: response });
    }

    return res
      .status(200)
      .json({
        metadata: await groupChatModel
          .findById(idUser)
          .select(["_id", "name", "img"]),
      });
  };
}

module.exports = new SearchController();
