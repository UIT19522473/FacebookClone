const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "PrivateChat";
const COLLECTION_NAME = "PrivateChats";

const privateChatSchema = new Schema(
  {
    idCommon: {
      type: String,
      require: true,
    },

    historyChat: {
      type: Array,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, privateChatSchema);
