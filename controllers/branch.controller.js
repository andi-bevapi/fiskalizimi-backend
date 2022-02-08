const BranchService = require('../services/branch.services');

const getBranches = async (req, res) => {
    try {
        const data = await BranchService.getList({});

        res.json({
            statusCode: 200,
            message: 'Lista e degeve',
            data
        });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message });
    }
}

module.exports = {
    getBranches
};