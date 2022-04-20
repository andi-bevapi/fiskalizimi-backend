const arka = require("../db/models/arka");
const GeneralError = require("../utils/GeneralError");

const getAllArka = async (branchId) => {
  const allArka = await arka.findAll({ where: { branchId } });
  return allArka;
};

const createArka = async (body) => {
  const checkIfNameExist = await arka.findOne({ where: { name: body.name } });
  if (checkIfNameExist) {
    throw new GeneralError("Kjo arke me kete emer ekziston", 409);
  }
  const checkIfSerialNrExist = await arka.findOne({
    where: { serialNumber: body.serialNumber },
  });
  if (checkIfSerialNrExist) {
    throw new GeneralError("Kjo arke me kete numer serial ekziston", 409);
  }

  const newArka = await arka.create(body);
  return newArka;
};

const updateArka = async (branchId) => {
  const allCategory = await arka.findAll({ where: { branchId } });
  return allCategory;
};

module.exports = { getAllArka, createArka, updateArka };
