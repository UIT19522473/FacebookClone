const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentsId: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    desc: {
        type: String,
        trim: true,
        maxLength: 255,
        default: "",
    },
    img: {
        type: String,
        trim: true,
        maxLength: 255,
        default: "",
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})


//Export the model
module.exports = model(DOCUMENT_NAME, postSchema);