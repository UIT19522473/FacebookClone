const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "GroupChat";
const COLLECTION_NAME = "GroupChats";

const messageSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // messages: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Message'
    // }],
    historyChat: {
      type: Array,
    },
    name: {
      type: String,
      trim: true,
      maxLength: 255,
      require,
      default: "",
    },
    img: {
      type: String,
      default:
        "https://phucnvh.s3.ap-southeast-1.amazonaws.com/image_group.jpeg",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, messageSchema);
