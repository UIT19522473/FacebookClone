const jwt = require('jsonwebtoken');
const {AuthFailureError} = require("../core/error.response");
const {asyncHandler} = require("./checkAuth");
const {findUserByEmail, findUserById} = require("../services/user.service");
const {getInfoData} = require("../utils");
const HEADER = {
    AUTHORIZATION : 'authorization',
    REFRESHTOKEN: 'refreshtoken',
}
const createTokenPair = async (payload, privateKey) => {
    try {
        //accessToken
        const accessToken = await jwt.sign(payload, privateKey, {
            expiresIn: '2 days'
        })
        //refreshToken
        const refreshToken = await jwt.sign({_id: payload._id}, privateKey, {
            expiresIn: '7 days'
        })

        return {accessToken, refreshToken}
    }
    catch (err) {

    }
}

const authentication = asyncHandler(async (req, res, next) => {
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw AuthFailureError('Invalid Request');
    try{
        const decodeUser = jwt.verify(accessToken, process.env.PRIVATE_KEY);
        if (decodeUser) throw new AuthFailureError('Invalid Userid');
        req.user = decodeUser;
        return next();
    }
    catch (err){
        throw  err
    }
})




module.exports = {
    createTokenPair,
    authentication,

}