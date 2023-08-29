const { AuthFailureError, ForbiddenError} = require("../core/error.response");
const { asyncHandler } = require("../auth/checkAuth");
const jwt = require('jsonwebtoken');

const HEADER = {
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'refreshtoken',
}
const authentication = asyncHandler(async (req, res, next) => {
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new ForbiddenError('Invalid Request');
    try {
        const decodeUser = await jwt.verify(accessToken, process.env.PRIVATE_KEY);
        if (!decodeUser) throw new ForbiddenError('Invalid UserId');
        req.user = decodeUser;
        return next();
    }
    catch (err) {
        throw err
    }
})

module.exports = {authentication}