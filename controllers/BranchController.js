const BranchService = require('../services/BranchService');

const getBranches = async (req,res,next) => {
    try {
        const branch = await BranchService.getList();
        res.ok(branch,"List of branches");
    } catch (error) {
        next(error);
    }
}

const createBranch = async(req,res,next) =>{
    try{
        const branch = await BranchService.createBranch(req.body);
        res.ok(branch,"branch is created");
    } catch(error){
        next(error);
    }
}

const updateBranch = async(req,res,next) =>{
    try{
        const branch = await BranchService.updateBranch(req.body, req.params.id);
        res.ok(branch,"branch is update");
    }catch(error){
        next(error);
    }
}

const deleteBranch = async(req,res,next) =>{
    try{
        const branch = await BranchService.deleteBranch(req.params.id);
        res.ok(branch,"branch is deleted");
    }catch(error){
        next(error)
    }
}

module.exports = {
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch
};