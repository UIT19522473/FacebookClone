const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Comment';
const COLLECTION_NAME = 'Comments';

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true,
        maxLength: 255,
        require
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    parentId: {
        type: String,
        default: null,
    },
    commentsChild: [this],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

//Export the model
module.exports = model(DOCUMENT_NAME, commentSchema);