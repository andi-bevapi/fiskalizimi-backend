const sellingUnit = require("../db/models/sellingunit");
const GeneralError = require("../utils/GeneralError");

const getAll  = async () =>{
    const allSellingUnit = await sellingUnit.findAll({where:{isActive:true}});
    return allSellingUnit;
}

const create  = async(name) => {
    const checkIfExist = await sellingUnit.findOne({where : {name : name}});
    if(checkIfExist) {
        throw new GeneralError("Kjo njesi ekziston",409);
    }
    const newSellingUnit = await sellingUnit.create({name : name, isActive:true, isDeleted: false});
    return newSellingUnit;
}

const update  = async(name,id) =>{
    
    const checkIfExist = await sellingUnit.findOne({where : {name : name}});
    if(checkIfExist) {
        throw new GeneralError("Kjo njesi ekziston",409);
    }
    const updatedSellingUnit= await sellingUnit.update({name : name},{where: {id:id}, plain: true});
    return updatedSellingUnit;
}

const deleted = async(id) =>{
    const checkIfExist = await sellingUnit.findOne({where : {id : id}});
    if(checkIfExist) {
        const sellingUnitToDelete = await sellingUnit.update(
            {isActive : false , isDeleted : true},
            { where : { id : id }}
        );
        return sellingUnitToDelete;
    }
    throw new GeneralError("Kjo njesi nuk ekziston",404);
};

module.exports = { getAll, create , update , deleted } ;