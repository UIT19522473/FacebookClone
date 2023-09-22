// const postModel = require("../models/post.model");
// const { BadRequestError } = require("../core/error.response");
// const {findUserById} = require("./user.service");
// const {getInfoData} = require("../utils");
const groupChatModel = require("../models/groupChat.model");
class GroupChatService {
  static createGroupChat = async ({ members, name, historyChat, img }) => {
    const newGroupChat = await groupChatModel.create({
      members,
      name,
      historyChat,
      img,
    });
    return {
      groupChat: newGroupChat,
    };
  };
}

module.exports = GroupChatService;
