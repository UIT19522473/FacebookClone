const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/search.controller");
const { asyncHandler } = require("../../auth/checkAuth");
// const { upload } = require("../../utils");
const { authentication } = require("../../middlewares/authentication");
//create post
router.use(authentication);

router.get("/search", asyncHandler(searchController.getUsers));
router.get("/get-user-called", asyncHandler(searchController.getUserCalled));
module.exports = router;
