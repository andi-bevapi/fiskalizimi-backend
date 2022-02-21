const BranchService = require('../services/BranchService');

const getBranches = async (req,res,next) => {
    try {
        const branch = await BranchService.getList();
        res.ok(branch,"Lista me deget");
    } catch (error) {
        next(error);
    }
}

const createBranch = async(req,res,next) =>{
    try{
        const branch = await BranchService.createBranch(req.body);
        res.ok(branch,"Dega u krijuar me sukses ");
    } catch(error){
        
        next(error);
    }
}

const updateBranch = async(req,res,next) =>{
    try{
        const branch = await BranchService.updateBranch(req.body, req.params.id);
        res.ok(branch,"Dega u perditesua me sukses ");
    }catch(error){
        next(error);
    }
}

const deleteBranch = async(req,res,next) =>{
    try{
        const branch = await BranchService.deleteBranch(req.params.id);
        res.ok(branch,"Dega u fshi me sukses ");
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