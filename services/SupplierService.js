const supplier = require("../db/models/supplier");
const GeneralError = require("../utils/GeneralError");

const getAll  = async () =>{
    const allSupplier = await supplier.findAll({where:{isActive:true}});
    return allSupplier;
}

const create  = async(name,startDate,endDate) => {
    const checkIfExist = await supplier.findOne({where : {name : name}});
    if(checkIfExist) {
        throw new GeneralError("Ky furnizues ekziston",409);
    }
    const newSuplier = await supplier.create({name : name, startDate : startDate , endDate : endDate ,isActive:true, isDeleted: false});
    return newSuplier;
}

const update  = async(name,id) =>{
    
    const checkIfNameExists = await supplier.findOne({where : {name:name} });
    const checkIfIdExists = await supplier.findOne({where : {id : id}});

    if(checkIfNameExists) {
        throw new GeneralError("Ky furnizues me kete emer ekziston",409);
    }

    if(!checkIfIdExists) {
        throw new GeneralError("Ky furnizues nuk gjendet",404);
    }

    const updatedSuplier = await supplier.update({name : name},{where: {id:id}});
    return updatedSuplier;
}

const deleted = async(id) =>{
    const checkIfExist = await supplier.findOne({where : {id : id}});
    if(checkIfExist) {
        const updatedSuplier = await supplier.update(
            {isActive : false , isDeleted : true},
            { where : { id : id }}
        );
        return updatedSuplier;
    }
    throw new GeneralError("Kjo furnizues nuk ekziston",404);
};

module.exports = { getAll, create , update , deleted } ;