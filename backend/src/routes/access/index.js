const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller')
//signUp
router.post('/user/signup', accessController.signUp);
//signIn
router.post('/user/signin', accessController.signIn);

module.exports = router;