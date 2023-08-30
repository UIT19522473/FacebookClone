const postModel = require('../models/post.model');
const {BadRequestError} = require("../core/error.response");
class PostService {
    static createPost = async ({ userId, desc, img }) => {
        const newPost = await postModel.create({ userId, desc, img });
        return {
                post: newPost
        }
    }

    static addCommentToPost = async ({commentId, postId}) => {
        const post = await postModel.findById(postId);
        if (!post) throw new BadRequestError('postId not exist');
        post.commentsId.push(commentId);
        await post.save();
    }

    static getPostByUserId = async ({userId}) => {
        const listPost = await postModel.find({userId})
            .populate('userId')
            .populate('commentsId')
        return {
                post: listPost
        }
    }
}

module.exports = PostService