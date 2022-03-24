const CategoryServices = require("../services/CategoryServices");

const getAllCategory = async (req, res, next) => {
    try {
        const categories = await CategoryServices.getAllCategory();
        res.ok(categories);
    } catch (error) {
        next(error);
    }
}

const createCategory = async (req, res, next) => {
    try {
        const categoryToCreate = await CategoryServices.createCategory(req.body.name.toUpperCase());
        res.ok(categoryToCreate, "Kategoria u krijua me sukses!")
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const categoryToUpdate = await CategoryServices.updatedCategory(req.body.name.toUpperCase(), req.params.id);
        res.ok(categoryToUpdate, "Kategoria u perditesua me sukses!");
    } catch (error) {
        next(error);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const categoryToDelete = await CategoryServices.deleteCategory(req.params.id);
        res.ok(categoryToDelete, "Kategoria u fshi me sukses!");
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllCategory, createCategory, updateCategory, deleteCategory };