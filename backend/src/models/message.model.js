const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'Messages';

const messageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true,
        maxLength: 255,
        require
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

//Export the model
module.exports = model(DOCUMENT_NAME, messageSchema);