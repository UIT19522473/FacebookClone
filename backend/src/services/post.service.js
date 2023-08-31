const postModel = require("../models/post.model");
const { BadRequestError } = require("../core/error.response");
const {findUserById} = require("./user.service");
const {getInfoData} = require("../utils");
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
            .populate("userId")
            .populate("commentsId")

        for (let i=0; i< listPost.length; i++) {
            for (let j=0; j< listPost[i].commentsId.length; j++) {
                for (let k=0; k< listPost[i].commentsId[j].commentsChild.length; k++)
                {
                    let temp = listPost[i].commentsId[j].commentsChild[k].reply;
                    if (temp) {
                         const user = (await findUserById(temp));
                         listPost[i].commentsId[j].commentsChild[k].reply = getInfoData({ fields: ['_id', 'name', 'img', 'email'], object: user });
                    }
                }
            }
        }

        return {
            post: listPost,
        };
    };
}

module.exports = PostService;
