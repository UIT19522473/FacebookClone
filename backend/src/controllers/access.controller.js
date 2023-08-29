const AccessService = require('../services/access.service')
const {CREATED} = require("../core/success.response");
class AccessController {
    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUp(req.body)
        }).send(res);
    }

    signIn = async (req, res, next) => {
            return res.status(200).json(await AccessService.signIn(req.body));
    }
}

module.exports = new AccessController();