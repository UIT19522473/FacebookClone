const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const {getInfoData} = require("../utils");
const crypto = require("crypto");
const {createTokenPair} = require("../auth/authUtils");
const {findUserByEmail, findUserById} = require("./user.service");
const {BadRequestError, AuthFailureError} = require("../core/error.response");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
class AccessService{
    static signUp = async ({firstName, lastName, email, password}) => {
            //check email
            const user = await findUserByEmail(email);

            if (user) {
               throw new BadRequestError('Error: Email already registered')
            }

            const passwordHash =  await bcrypt.hash(password, 10);

            const newUser = await userModel.create({
                firstName,
                lastName,
                email,
                password: passwordHash
            })

            if (newUser){
                const tokens = await createTokenPair({_id: newUser._id, firstName, lastName, email}, PRIVATE_KEY);
                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({fields: ['_id','firstName', 'lastName', 'email'], object: newUser}),
                        tokens
                    }
                }
            }

    }
    static signIn = async ({email, password}) => {
        const user = await findUserByEmail(email);
        if (!user) throw new BadRequestError('User not registered');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthFailureError('Authentication error');

        const tokens = await createTokenPair({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email}, PRIVATE_KEY);

        return {
            code: 201,
            metadata: {
                user: getInfoData({fields: ['_id','firstName', 'lastName', 'email'], object: user}),
                tokens
            }
        }
    }
    static renewToken = async (req, res, next) => {
        const refreshToken = req.headers[HEADER.REFRESHTOKEN];
        if (!refreshToken) throw AuthFailureError('Invalid Request');

        try{
            const decodeUser = jwt.verify(refreshToken, process.env.PRIVATE_KEY);
            if (decodeUser) throw new AuthFailureError('Invalid User');
            const user = await findUserById(decodeUser._id);
            const payload = getInfoData({fields: ['_id','firstName', 'lastName', 'email'], object: user});
            const accessToken = await jwt.sign(payload, process.env.PRIVATE_KEY, {
                expiresIn: '2 days'
            })
            return accessToken;
        }
        catch (err){
            throw err
        }
    }
}

module.exports = AccessService;