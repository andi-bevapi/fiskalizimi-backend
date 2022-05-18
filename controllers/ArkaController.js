const ArkaServices = require("../services/ArkaServices");

const getAllArka = async (req, res, next) => {
  try {
    const arkat = await ArkaServices.getAllArka(req.params.branchId);
    res.ok(arkat);
  } catch (error) {
    next(error);
  }
};

const getAllArkaByClientId = async (req, res, next) => {
  try {
    const arkat = await ArkaServices.getAllArkaByClientId(req.params.clientId);
    res.ok(arkat);
  } catch (error) {
    next(error);
  }
};

const createArka = async (req, res, next) => {
  try {
    const newArka = await ArkaServices.createArka(req.body);
    res.ok(newArka, "Arka e re u shtua me sukses!");
  } catch (error) {
    next(error);
  }
};

const updateArka = async (req, res, next) => {
  try {
    const arkaToUpdate = await ArkaServices.updateArka(req.body, req.params.id);
    res.ok(arkaToUpdate, "Arka u perditesua me sukses!");
  } catch (error) {
    next(error);
  }
};

const deleteArka = async (req, res, next) => {
  try {
    const arkaToDelete = await ArkaServices.deleteArka(req.params.id);
    res.ok(arkaToDelete, "Arka u fshi me sukses!");
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllArka, createArka, updateArka, deleteArka, getAllArkaByClientId };
