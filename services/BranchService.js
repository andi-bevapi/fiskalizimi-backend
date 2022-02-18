const Branch = require('../db/models/branch');
const Client = require('../db/models/client');
const GeneralError = require("../utils/GeneralError");

const getList = async function (query = {}, page = 1, limit = 10) {
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

const createBranch = async(body) => {
    console.log("body-----",body);
    const checkClientId = await Client.findOne({where:body.clientId});
    if(!checkClientId){
        throw new GeneralError("Ky klient me kete id nuk gjendet",404);
    }
    const createdBranch = await Branch.create(body);
    return createdBranch;
}

const updateBranch = async(body,id) => {
    const checkClientId = await Client.findOne({where:body.clientId});
    const checkBranchId = await Branch.findOne({where:{id}});
    if(!checkClientId){
        throw new GeneralError("Ky klient me kete id nuk gjendet",404);
    }
    if(!checkBranchId){
        throw new GeneralError("Ky branch  me kete id nuk gjendet",404);
    }
    const updateBranch = await Branch.update({body},{where: {id}, plain: true});
    return updateBranch;
}

const deleteBranch = async(id) => {
    const checkBranch = await Branch.findOne({where : {id}});
    if(checkBranch) {
        const categoryToDelete = await Branch.update(
            {isActive:false,isDeleted:true},
            { where : {id}}
        );
        return categoryToDelete;
    }
    throw new GeneralError("Kjo Branch me kete ID nuk ekziston",404);
}

module.exports = {getList,createBranch,updateBranch,deleteBranch}