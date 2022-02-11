const SellingUnitServices = require("../services/SellingUnitService");

const getAllSellingUnit = async (req, res, next) => {
    try {
        const sellingUnit = await SellingUnitServices.getAll();
        res.ok(sellingUnit);
    } catch (error) {
        next(error);
    }
}

const createSellingUnit = async (req, res, next) => {
    try {
        const createSellingUnit = await SellingUnitServices.create(req.body.name.toUpperCase());
        res.ok(createSellingUnit, "Selling Unit is created")
    } catch (error) {
        next(error);
    }
}

const updatedSellingUnit = async (req, res, next) => {
    try {
        const updateSellingUnit = await SellingUnitServices.update(req.body.name.toUpperCase(), req.params.id);
        res.ok(updateSellingUnit, "Selling Unit is updated");
    } catch (error) {
        next(error);
    }
}

const deleteSellingUnit = async (req, res, next) => {
    try {
        const deleteSellingUnit = await SellingUnitServices.deleted(req.params.id);
        res.ok(deleteSellingUnit, "Selling Unit is deleted");
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllSellingUnit, createSellingUnit, updatedSellingUnit, deleteSellingUnit };