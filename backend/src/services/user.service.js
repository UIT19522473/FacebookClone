const userModel = require('../models/user.model');
const findUserByEmail = async (email) => {
    const user = await userModel.findOne({ email }).lean();
    return user;
}

const findUserById = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

module.exports = {
    findUserByEmail,
    findUserById
};