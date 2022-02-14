const SupplierService = require("../services/SupplierService");

const getAllSupplier = async (req, res, next) => {
    try {
        const allSuplier = await SupplierService.getAll();
        res.ok(allSuplier);
    } catch (error) {
        next(error);
    }
}

const createSupplier = async (req, res, next) => {
    try {
        const createSupplier = await SupplierService.create(req.body.name.toUpperCase() , req.body.startDate , req.body.endDate);
        res.ok(createSupplier, "Supplier is created");
    } catch (error) {
        next(error);
    }
}

const updatedSupplier = async (req, res, next) => {
    try {
        const updateSupplier = await SupplierService.update(req.body.name.toUpperCase(), req.params.id);
        res.ok(updateSupplier, "Supplier is updated");
    } catch (error) {
        next(error);
    }
}

const deleteSupplier = async (req, res, next) => {
    try {
        const deleteSupplier = await SupplierService.deletedSupplier(req.params.id);
        res.ok(deleteSupplier, "Supplier is deleted");
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllSupplier, createSupplier, updatedSupplier, deleteSupplier };