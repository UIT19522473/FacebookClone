const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller')
const {asyncHandler} = require("../../auth/checkAuth");
//signUp
router.post('/user/signup', asyncHandler(accessController.signUp));
//signIn
router.post('/user/signin', asyncHandler(accessController.signIn));

module.exports = router;