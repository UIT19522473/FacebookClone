const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { upload } = require("../../utils");
const { authentication } = require("../../middlewares/authentication");
//create post
router.use(authentication);
router.post(
  "/post",
  upload.array("img", 3),
  asyncHandler(postController.createPost)
);

router.get("/post", asyncHandler(postController.getPostByUserId));
router.get("/post/:id", asyncHandler(postController.getPostById));

module.exports = router;
