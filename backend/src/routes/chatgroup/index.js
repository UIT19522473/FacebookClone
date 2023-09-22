const express = require("express");
const router = express.Router();
const groupChatController = require("../../controllers/groupChat.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { upload } = require("../../utils");
// const { authentication } = require("../../middlewares/authentication");
//create post
// router.use(authentication);
router.post(
  "/create-mess-group",
  upload.array("img", 3),
  asyncHandler(groupChatController.createGroupChat)
);

router.get(
  "/get-group-chat",
  // upload.array("img", 3),
  asyncHandler(groupChatController.getGroupChat)
);

router.put(
  "/push-to-history",
  // upload.array("img", 3),
  asyncHandler(groupChatController.pushToHistoryChat)
);

router.get(
  "/get-history-chat",
  // upload.array("img", 3),
  asyncHandler(groupChatController.getHistoryChat)
);

module.exports = router;
