const postModel = require("../models/post.model");
const { BadRequestError } = require("../core/error.response");
const { findUserById } = require("./user.service");
const { getInfoData } = require("../utils");
class PostService {
    static createPost = async ({ userId, desc, img }) => {
        const newPost = await postModel.create({ userId, desc, img });
        return {
            post: newPost,
        };
    };

    static addCommentToPost = async ({ commentId, postId }) => {
        const post = await postModel.findById(postId);
        if (!post) throw new BadRequestError("postId not exist");
        post.commentsId.push(commentId);
        await post.save();
    };

    static getPostByUserId = async ({ userId }) => {
        const listPost = await postModel
            .find()
            .populate({
                path: 'userId',
                model: 'User'
            })
            .populate({
                path: 'commentsId',
                model: 'Comment',
                populate: [
                    {
                        path: 'userId',
                        model: 'User'
                    },
                    {
                        path: 'commentsChild',
                        populate: [
                            {
                                path: 'userId',
                                model: 'User'
                            },
                            {
                                path: 'reply',
                                model: 'User'
                            }
                        ]
                    }
                ]
            });

        return {
            post: listPost,
        };
    };

    static getPostById = async ({ postId }) => {
        const post = await postModel
            .findById(postId)
            .populate({
                path: 'userId',
                model: 'User'
            })
            .populate({
                path: 'commentsId',
                model: 'Comment',
                populate: [
                    {
                        path: 'userId',
                        model: 'User'
                    },
                    {
                        path: 'commentsChild',
                        populate: [
                            {
                                path: 'userId',
                                model: 'User'
                            },
                            {
                                path: 'reply',
                                model: 'User'
                            }
                        ]
                    }
                ]
            });

        return {
            post,
        };
    }
}

module.exports = PostService;
