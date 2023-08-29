const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/comment.controller')
const { asyncHandler } = require("../../auth/checkAuth");
const {authentication} = require("../../middlewares/authentication");

router.use(authentication);
router.post('/comment', asyncHandler(commentController.createComment));
module.exports = router;