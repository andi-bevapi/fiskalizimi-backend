const SupplierService = require("../services/SupplierService");

const getAllSupplier = async (req, res, next) => {
    try {
        const allSuplier = await SupplierService.getAll(req.params.branchId);
        res.ok(allSuplier);
    } catch (error) {
        next(error);
    }
}

const getAllSupplierByClientId = async (req, res, next) => {
    try {
        const allSuplier = await SupplierService.getAllByClientId(req.params.clientId);
        res.ok(allSuplier);
    } catch (error) {
        next(error);
    }
}

const createSupplier = async (req, res, next) => {
    try {
        const createSupplier = await SupplierService.create(req.body);
        res.ok(createSupplier, "Furnitori u krijua me sukses!");
    } catch (error) {
        next(error);
    }
}

const updatedSupplier = async (req, res, next) => {
    try {
        const updateSupplier = await SupplierService.update(req.body, req.params.id);
        res.ok(updateSupplier, "Furnitori u perditesua me sukses!");
    } catch (error) {
        next(error);
    }
}

const deleteSupplier = async (req, res, next) => {
    try {
        const deleteSupplier = await SupplierService.deletedSupplier(req.params.id);
        res.ok(deleteSupplier, "Furnitori u fshi me sukses!");
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllSupplier, createSupplier, updatedSupplier, deleteSupplier, getAllSupplierByClientId };