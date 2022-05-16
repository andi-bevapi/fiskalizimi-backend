const SellingUnitServices = require("../services/SellingUnitService");

const getAllSellingUnit = async (req, res, next) => {
    try {
        const sellingUnit = await SellingUnitServices.getAll(req.params.branchId);
        res.ok(sellingUnit);
    } catch (error) {
        next(error);
    }
}

const getAllSellingUnitByClientId = async (req, res, next) => {
    try {
        const sellingUnit = await SellingUnitServices.getAllByClientId(req.params.clientId);
        res.ok(sellingUnit);
    } catch (error) {
        next(error);
    }
}

const createSellingUnit = async (req, res, next) => {
    try {
        const createSellingUnit = await SellingUnitServices.create(req.body);
        res.ok(createSellingUnit, "Njesia matese u krijua me sukses!")
    } catch (error) {
        next(error);
    }
}

const updatedSellingUnit = async (req, res, next) => {
    try {
        const updateSellingUnit = await SellingUnitServices.update(req.body, req.params.id);
        res.ok(updateSellingUnit, "Njesia matese u perditesua me sukses!");
    } catch (error) {
        next(error);
    }
}

const deleteSellingUnit = async (req, res, next) => {
    try {
        const deleteSellingUnit = await SellingUnitServices.deleteSellingUnit(req.params.id);
        res.ok(deleteSellingUnit, "Njesia matese u fshi me sukses!");
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllSellingUnit, createSellingUnit, updatedSellingUnit, deleteSellingUnit, getAllSellingUnitByClientId };