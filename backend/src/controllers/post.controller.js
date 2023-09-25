const { CREATED, OK } = require("../core/success.response");
const PostService = require("../services/post.service");

class PostController {
  createPost = async (req, res, next) => {
    // console.log("test...", req.body);
    new CREATED({
      message: "Up post success",
      metadata: await PostService.createPost({
        userId: req.user._id,
        desc: req.body.desc,
        img: req?.files[0]?.location ? req?.files[0]?.location : null,
      }),
    }).send(res);
  };
  getPostByUserId = async (req, res, next) => {
    new OK({
      message: "Get list post success",
      metadata: await PostService.getPostByUserId({ userId: req.user._id }),
    }).send(res);
  };

  getPostById = async (req, res, next) => {
    new OK({
      message: "get post success",
      metadata: await PostService.getPostById({ postId: req.params.id })
    }).send(res);
  }
}

module.exports = new PostController();
