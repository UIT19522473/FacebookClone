const { CREATED, OK } = require("../core/success.response");
const userModel = require("../models/user.model");
const PostService = require("../services/post.service");

class SearchController {
  getUsers = async (req, res, next) => {
    const { idU, name } = req.query;
    // console.log(idU, name);

    const dynamicQuery = {};

    if (idU) {
      dynamicQuery._id = idU;
    }
    if (name) {
      dynamicQuery.name = { $regex: name, $options: "i" };
    }
    new OK({
      message: "Get list user success",
      metadata: await userModel.find(dynamicQuery),
      //   metadata: await userModel.find({ _id: "64f09ef1ba02976f5151cb32" }),
    }).send(res);
  };
}

module.exports = new SearchController();
