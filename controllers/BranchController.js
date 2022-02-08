const BranchService = require('../services/BranchService');

const getBranches = async (req, res) => {
    try {
        const data = await BranchService.getList();
        res.ok(data);
    } catch (error) {
        res.fail(error.message);
    }
}

module.exports = {
    getBranches
};