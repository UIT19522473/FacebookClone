const express = require("express");
const router = express.Router();
const privateChatController = require("../../controllers/privateChat.controller");
const { asyncHandler } = require("../../auth/checkAuth");
// const { upload } = require("../../utils");
// const { authentication } = require("../../middlewares/authentication");
//create post
// router.use(authentication);
router.post(
  "/create-mess-private",

  asyncHandler(privateChatController.createChat)
);

router.get(
  "/get-mess-private",

  asyncHandler(privateChatController.getChat)
);

module.exports = router;
