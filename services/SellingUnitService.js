const sellingUnit = require("../db/models/sellingunit");
const GeneralError = require("../utils/GeneralError");

const getAll  = async () =>{
    const allSellingUnit = await sellingUnit.findAll({where:{isActive:true}, attributes: ['id','name']});
    return allSellingUnit;
}

const create  = async(name) => {
    const checkIfExist = await sellingUnit.findOne({where : {name,isDeleted:false}});
    if(checkIfExist) {
        throw new GeneralError("Kjo njesi ekziston",409);
    }
    const newSellingUnit = await sellingUnit.create({name});
    return newSellingUnit;
}

const update  = async(name,id) =>{
    
    const checkIfNameExists = await sellingUnit.findOne({where : {name} });
    const checkIfIdExists = await sellingUnit.findOne({where : {id}});

    if(checkIfNameExists) {
        throw new GeneralError("Kjo njesi me kete emer ekziston",409);
    }

    if(!checkIfIdExists) {
        throw new GeneralError("Kjo njesi nuk gjendet",404);
    }

    const updatedSellingUnit= await sellingUnit.update({name},{where: {id}, plain: true});
    return updatedSellingUnit;
}

const deleteSellingUnit = async(id) =>{
    const checkIfExist = await sellingUnit.findOne({where : {id}});
    if(checkIfExist) {
        const sellingUnitToDelete = await sellingUnit.update(
            {isActive : false , isDeleted : true},
            { where : { id }}
        );
        return sellingUnitToDelete;
    }
    throw new GeneralError("Kjo njesi nuk ekziston",404);
};

module.exports = { getAll, create , update , deleteSellingUnit } ;