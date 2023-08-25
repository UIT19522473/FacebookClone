const userModel = require('../models/user.model');
const findUserByEmail = async (email) => {
        const user = await userModel.findOne({email}).lean();
        return user;
}


module.exports = {
    findUserByEmail
};