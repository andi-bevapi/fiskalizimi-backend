const Branch = require('../db/models/branch');
const Client = require('../db/models/client');

const getBranches = async (req, res) => {
    try {
        const data = await Branch.findAll({
            include: [
                {
                    model: Client,
                    as: 'client'
                }
            ]
        });
        res.send({
            statusCode: 200,
            message: 'Lista e degeve',
            data
        });
    } catch (error) {
        res.status(500).send()
    }
}

module.exports = {
    getBranches
};