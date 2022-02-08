const Branch = require('../db/models/branch');
const Client = require('../db/models/client');

const getClients = async (req, res) => {
    try {
        const data = await Client.findAll({
            include: [
                {
                    model: Branch,
                    as: 'branches'
                }
            ]
        });
        res.send({
            statusCode: 200,
            message: 'Lista e klienteve',
            data
        });
    } catch (error) {
        res.status(500).send()
    }
}

module.exports = {
    getClients
};