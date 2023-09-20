const { CREATED, OK } = require("../core/success.response");
const groupChatModel = require("../models/groupChat.model");
const userModel = require("../models/user.model");
const GroupChatService = require("../services/groupChat.service");
// const PostService = require("../services/post.service");
const mongoose = require("mongoose");

class GroupChatController {
  createGroupChat = async (req, res, next) => {
    // console.log(req.body);
    let arrIdUser = [];
    const arrMember = req.body.members.split(",");
    const promises = arrMember.map(async (item) => {
      const response = await userModel.findById(item);
      //   console.log("map", response);
      if (response) arrIdUser.push(response._id);
    });

    await Promise.all(promises);

    // console.log("demo", arrIdUser);
    new CREATED({
      message: "create group chat success",
      metadata: await GroupChatService.createGroupChat({
        members: arrIdUser,
        name: req.body.name,
        historyChat: [],
        img: req?.files[0]?.location ? req?.files[0]?.location : null,
      }),
    }).send(res);
  };

  getGroupChat = async (req, res, next) => {
    // console.log(req.query);
    // return res.status(200).json(req.query);
    const { idUser } = req.query;

    // console.log(idUser);
    const idUserObject = new mongoose.Types.ObjectId(idUser); // ObjectId của user bạn muốn tìm
    // res.status(200).json(idUserObject);

    try {
      const response = await groupChatModel
        .find({ members: idUserObject })
        .populate("members", ["_id", "img", "email", "name"]);
      res.status(200).json({ metadata: response });
    } catch (error) {
      res.status(500).json({ mess: "error from server" });
    }
  };
}

module.exports = new GroupChatController();
