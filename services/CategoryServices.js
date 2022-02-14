const category = require("../db/models/category");
const GeneralError = require("../utils/GeneralError");

const getAllCategory = async () =>{
    const allCategory = await category.findAll({where:{isActive:true}});
    return allCategory;
}

const createCategory = async(name) => {
    const checkIfExist = await category.findOne({where : {name : name}});
    if(checkIfExist) {
        throw new GeneralError("Kjo kategori ekziston",409);
    }
    const newCategory = await category.create({name : name, isActive:true, isDeleted: false});
    return newCategory;
}

const updatedCategory = async(name,id) =>{
    const checkIfExist = await category.findOne({where : {name : name}});
    if(checkIfExist) {
        throw new GeneralError("Kjo kategori ekziston",409);
    }
    const updatedCategory = await category.update({name : name},{where: {id:id}, plain: true});
    return updatedCategory;
}

const deleteCategory = async(id) =>{
    const checkIfExist = await category.findOne({where : {id : id}});
    if(checkIfExist) {
        const categoryToDelete = await category.update(
            {isActive : false , isDeleted : true},
            { where : { id : id }}
        );
        return categoryToDelete;
    }
    throw new GeneralError("Kjo kategori nuk ekziston",404);
};

module.exports = { getAllCategory , createCategory , updatedCategory , deleteCategory } ;