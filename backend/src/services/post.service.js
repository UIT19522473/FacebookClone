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
                let userId = listPost[i].commentsId[j].userId;

                const getTemp = await findUserById(userId);
                listPost[i].commentsId[j].userId = getTemp;
                console.log('Day la user ',listPost[i].commentsId[j].userId);

                for (let k=0; k< listPost[i].commentsId[j].commentsChild.length; k++)
                {
                    let temp = listPost[i].commentsId[j].commentsChild[k].reply;

                    if (temp) {
                         const user = (await findUserById(temp));
                         listPost[i].commentsId[j].commentsChild[k].reply = user;
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
