const express = require('express');
const router = express.Router();

//check permission
router.use('/v1/api', require('./access/index'));
router.use('/v1/api', require('./post/index'));
router.use('/v1/api', require('./comment/index'));

router.get('', (req, res, next) => {
    return res.status(200).json({
        message:'Welcome'
    })
})

module.exports = router