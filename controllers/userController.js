const User = require('../models/user');

const findUser = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.send(users);
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    findUser
};