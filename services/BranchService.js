const Branch = require('../db/models/branch');
const Client = require('../db/models/client');

exports.getList = async function (query = {}, page = 1, limit = 10) {
    return await Branch.findAll({
        ...query,
        include: [
            {
                model: Client,
                as: 'client'
            }
        ]
    });
}