const jwt = require('jsonwebtoken');

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

module.exports = {
    createTokenPair
}