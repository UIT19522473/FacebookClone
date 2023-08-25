const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const {getInfoData} = require("../utils");
const crypto = require("crypto");
const {createTokenPair} = require("../auth/authUtils");
const {findUserByEmail} = require("./user.service");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
class AccessService{
    static signUp = async ({firstName, lastName, email, password}) => {
        try{
            //check email
            const user = await findUserByEmail(email);

            if (user) {
                console.log('123: ',user);
                return {
                    code: 'xxx',
                    message: 'Email already registered'
                }
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
                        user: getInfoData({fields: ['firstName', 'lastName', 'email'], object: newUser}),
                        tokens
                    }
                }
            }
        }
        catch (e){
            return {
                code: 'xxx',
                message: e.message,
                status: 'error'
            }
        }
    }

    static signIn = async ({email, password}) => {
        const user = await findUserByEmail(email);
        const match = await bcrypt.compare(password, user.password);
        if (match) return {
            code: 'xxx',
            message: 'login Success'
        }
        else return  {
            code: 'xxx',
            message: 'login Failure'
        }
    }
}

module.exports = AccessService;