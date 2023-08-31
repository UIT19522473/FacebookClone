const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 255,
        require,
    },
    img: {
        type: String,
        default: "https://phucnvh.s3.ap-southeast-1.amazonaws.com/no-avatar.jpeg",
    },
    email: {
        type: String,
        trim: true,
        maxLength: 255,
        require
    },
    password: {
        type: String,
        trim: true,
        maxLength: 255,
        require
    },
    verify: {
        type: Schema.Types.Boolean,
        default: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);