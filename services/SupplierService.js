const supplier = require("../db/models/supplier");
const GeneralError = require("../utils/GeneralError");

const getAll = async (branchId) => {
  const allSupplier = await supplier.findAll({
    where: { branchId, isActive: true }
  });
  return allSupplier;
};

const getAllByClientId = async (clientId) => {
  const allSupplier = await supplier.findAll({
    where: { clientId, isActive: true }
  });
  return allSupplier;
};

const create = async (body) => {
  const checkIfExist = await supplier.findOne({
    where: { name: body.name.toUpperCase(), isDeleted: false, isActive: true },
  });
  if (checkIfExist) {
    throw new GeneralError("Ky furnizues ekziston", 409);
  }
  const newSuplier = await supplier.create({ name: body.name.toUpperCase(), branchId: body.branchId, clientId: body.clientId });
  return newSuplier;
};

const update = async (body, id) => {
  const checkIfNameExists = await supplier.findOne({ where: { name: body.name.toUpperCase(), isDeleted: false, isActive: true } });
  const checkIfIdExists = await supplier.findOne({ where: { id } });

  if (checkIfNameExists && checkIfNameExists.id != id) {
    throw new GeneralError("Ky furnizues me kete emer ekziston", 409);
  }

  if (!checkIfIdExists) {
    throw new GeneralError("Ky furnizues nuk gjendet", 404);
  }

  const updatedSuplier = await supplier.update({ name: body.name.toUpperCase(), branchId: body.branchId }, { where: { id } });
  return updatedSuplier;
};

const deletedSupplier = async (id) => {
  const checkIfExist = await supplier.findOne({ where: { id } });
  if (checkIfExist) {
    const updatedSuplier = await supplier.update(
      { isActive: false, isDeleted: true },
      { where: { id } }
    );
    return updatedSuplier;
  }
  throw new GeneralError("Kjo furnizues nuk ekziston", 404);
};

module.exports = { getAll, create, update, deletedSupplier, getAllByClientId };
