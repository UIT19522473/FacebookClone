const commentModel = require('../models/comment.model');
const PostService = require("./post.service")
const { BadRequestError } = require("../core/error.response");

class CommentService {
    static createComment = async ({ userId, text, reply, parentId, postId }) => {
        //Comment Child
        console.log(parentId);
        if (parentId) {
            const commentParent = await commentModel.findById(parentId);
            if (!commentParent) throw new BadRequestError("parentId not exist");
            const commentChild = await commentModel.create({ userId, text, reply, parentId });
            commentParent.commentsChild
                .push(commentChild);
            await commentParent.save();
            return {
                comment: commentChild
            }
        }
        //comment Parent
        else {
            const newComment = await commentModel.create({ userId, text });
            await PostService.addCommentToPost({ commentId: newComment._id, postId });
            return {
                comment: newComment
            }
        }
    }
}

module.exports = CommentService