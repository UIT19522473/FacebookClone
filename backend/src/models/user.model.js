const {model, Schema} = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        maxLength: 255
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 255,
    },
    email: {
        type: String,
        trim: true,
        maxLength: 255
    },
    password: {
        type: String,
        trim: true,
        maxLength: 255
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