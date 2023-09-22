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
    const { idUser } = req.query;

    const idUserObject = new mongoose.Types.ObjectId(idUser); // ObjectId của user bạn muốn tìm

    try {
      const response = await groupChatModel
        .find({ members: idUserObject })
        .populate("members", ["_id", "img", "email", "name"])
        .select("-historyChat");

      res.status(200).json({ metadata: response });
    } catch (error) {
      res.status(500).json({ mess: "error from server" });
    }
  };

  pushToHistoryChat = async (req, res, next) => {
    const { idGroupChat, messDetail } = req.body;

    try {
      const response = await groupChatModel.findById(idGroupChat);
      // console.log(response);
      if (response) {
        response.historyChat.push(messDetail);
        await response.save();
      }

      return res.status(200).json("create chat group success");
    } catch (error) {
      res.status(500).json({ mess: "error from server" });
    }
  };

  getHistoryChat = async (req, res) => {
    const { idGroupChat } = req.query;

    // console.log(idCommon);
    if (!idGroupChat) throw new Error("Missing Input!!!");

    try {
      // Tìm cuộc trò chuyện theo idCommon
      const groupChat = await groupChatModel.findById(idGroupChat);

      return res
        .status(200)
        .json({ metadatas: groupChat, mess: "get group chat success" });
    } catch (error) {
      console.error("get private chat error", error);
      return res.status(500).json("Internal Server Error");
    }
  };
}

module.exports = new GroupChatController();
