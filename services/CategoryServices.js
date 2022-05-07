const category = require("../db/models/category");
const GeneralError = require("../utils/GeneralError");

const getAllCategory = async (branchId) => {
    const allCategory = await category.findAll({ where: { branchId, isActive: true } });
    return allCategory;
}

const createCategory = async (body) => {
    const checkIfExist = await category.findOne({ where: { name: body.name.toUpperCase(), isDeleted: false, isActive: true } });
    if (checkIfExist) {
        throw new GeneralError("Kjo kategori ekziston", 409);
    }
    const newCategory = await category.create({ name: body.name.toUpperCase(), branchId: body.branchId });
    return newCategory;
}

const updatedCategory = async (body, id) => {
    const checkIfExist = await category.findOne({ where: { name: body.name.toUpperCase(), isDeleted: false, isActive: true } });
    const checkIfIdExists = await category.findOne({ where: { id } });

    if (checkIfExist && checkIfExist.id != id) {
        throw new GeneralError("Kjo kategori ekziston", 409);
    }

    if (!checkIfIdExists) {
        throw new GeneralError("Kjo kategori nuk gjendet", 404);
    }

    const updatedCategory = await category.update({ name: body.name.toUpperCase(), branchId: body.branchId }, { where: { id }, plain: true });
    return updatedCategory;
}

const deleteCategory = async (id) => {
    const checkIfExist = await category.findOne({ where: { id } });
    if (checkIfExist) {
        const categoryToDelete = await category.update(
            { isActive: false, isDeleted: true },
            { where: { id } }
        );
        return categoryToDelete;
    }
    throw new GeneralError("Kjo kategori nuk ekziston", 404);
};

module.exports = { getAllCategory, createCategory, updatedCategory, deleteCategory };