const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { getInfoData } = require("../utils");
const { createTokenPair } = require("../auth/authUtils");
const { findUserByEmail, findUserById } = require("./user.service");
const { BadRequestError, AuthFailureError, NotFoundError, ConflictRequestError} = require("../core/error.response");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
class AccessService {
    static signUp = async ({ firstName, lastName, email, password }) => {
        //check email
        const user = await findUserByEmail(email);

        if (user) {
            throw new ConflictRequestError('Error: Email already registered')
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: passwordHash
        })

        if (newUser) {
            const tokens = await createTokenPair({ _id: newUser._id, firstName, lastName, email }, PRIVATE_KEY);
            return {
                code: 201,
                metadata: {
                    user: getInfoData({ fields: ['_id', 'firstName', 'lastName', 'email'], object: newUser }),
                    tokens
                }
            }
        }

    }
    static signIn = async ({ email, password }) => {
        const user = await findUserByEmail(email);
        if (!user) throw new NotFoundError('User not registered');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthFailureError('password wrong');

        const tokens = await createTokenPair({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }, PRIVATE_KEY);

        return {
            code: 200,
            metadata: {
                user: getInfoData({ fields: ['_id', 'firstName', 'lastName', 'email'], object: user }),
                tokens
            }
        }
    }

}

module.exports = AccessService;