const privateChatModel = require("../models/privateChat.model");

const createChat = async (req, res) => {
  const { idCommon, messDetail } = req.body;
  //   console.log(messDetail);

  if (!idCommon || !messDetail) throw new Error("Missing Input!!!");

  try {
    // Tìm cuộc trò chuyện theo idCommon
    const existingChat = await privateChatModel.findOne({ idCommon });

    if (!existingChat) {
      // Nếu cuộc trò chuyện không tồn tại, tạo mới và thêm messDetail
      await privateChatModel.create({
        idCommon,
        historyChat: [messDetail], // Tạo một mảng chứa messDetail đầu tiên
      });
    } else {
      // Nếu cuộc trò chuyện đã tồn tại, sử dụng $push để thêm messDetail vào mảng
      existingChat.historyChat.push(messDetail);
      await existingChat.save();
    }

    return res.status(200).json("create chat private success");
  } catch (error) {
    console.error("Lỗi khi tạo/cập nhật cuộc trò chuyện:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const getChat = async (req, res) => {
  const { idCommon } = req.query;

  console.log(idCommon);
  if (!idCommon) throw new Error("Missing Input!!!");

  try {
    // Tìm cuộc trò chuyện theo idCommon
    const privateChat = await privateChatModel.findOne({ idCommon });

    return res
      .status(200)
      .json({ metadatas: privateChat, mess: "get private chat success" });
  } catch (error) {
    console.error("get private chat error", error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = { createChat, getChat };
