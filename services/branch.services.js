var Branch = require('../db/models/branch');
var Client = require('../db/models/client');

exports.getList = async function (query, page = 1, limit = 10) {
    try {
        return await Branch.findAll({
            ...query,
            include: [
                {
                    model: Client,
                    as: 'client'
                }
            ]
        });
    } catch (e) {
        throw Error('Error while Paginating Branches');
    }
}