const { CREATED } = require("../core/success.response");
const CommentService = require("../services/comment.service")

class CommentController {
    createComment = async (req, res, next) => {
     
        new CREATED({
            message: 'create comment success',
            metadata: await CommentService.createComment(
                {
                    userId: req.user._id,
                    text: req.body.text,
                    reply: req.body.reply,
                    parentId: req.body.parentId,
                    postId: req.body.postId })
        }).send(res)
    }
}

module.exports = new CommentController();