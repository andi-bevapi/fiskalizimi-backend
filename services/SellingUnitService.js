const sellingUnit = require("../db/models/sellingunit");
const GeneralError = require("../utils/GeneralError");

const getAll = async (branchId) => {
    const allSellingUnit = await sellingUnit.findAll({ where: { branchId, isActive: true } });
    return allSellingUnit;
}

const create = async (body) => {
    const checkIfExist = await sellingUnit.findOne({ where: { name: body.name.toUpperCase(), isDeleted: false, isActive: true } });
    if (checkIfExist) {
        throw new GeneralError("Kjo njesi ekziston", 409);
    }
    const newSellingUnit = await sellingUnit.create({ name: body.name.toUpperCase(), branchId: body.branchId });
    return newSellingUnit;
}

const update = async (body, id) => {
    const checkIfNameExists = await sellingUnit.findOne({ where: { name: body.name.toUpperCase(), isDeleted: false, isActive: true } });
    const checkIfIdExists = await sellingUnit.findOne({ where: { id } });

    if (checkIfNameExists && checkIfNameExists.id != id) {
        throw new GeneralError("Kjo njesi me kete emer ekziston", 409);
    }

    if (!checkIfIdExists) {
        throw new GeneralError("Kjo njesi nuk gjendet", 404);
    }

    const updatedSellingUnit = await sellingUnit.update({ name: body.name.toUpperCase(), branchId: body.branchId }, { where: { id }, plain: true });
    return updatedSellingUnit;
}

const deleteSellingUnit = async (id) => {
    const checkIfExist = await sellingUnit.findOne({ where: { id } });
    if (checkIfExist) {
        const sellingUnitToDelete = await sellingUnit.update(
            { isActive: false, isDeleted: true },
            { where: { id } }
        );
        return sellingUnitToDelete;
    }
    throw new GeneralError("Kjo njesi nuk ekziston", 404);
};

module.exports = { getAll, create, update, deleteSellingUnit };