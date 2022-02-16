const productServices = require("../services/ProductServices");

const getProducts = async (req, res, next) => {
  try {
    const data = await productServices.getProductsService();
    res.ok(data, "Lista e produkteve");
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const data = await productServices.createProductService(req.body);
    res.ok(data, "Produkti u krijua me sukses!");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const data = await productServices.deleteProductService(req.params.id);
    res.ok(data, "Produkti u fshi me sukses!");
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const data = await productServices.updateProductService(
      req.params.id,
      req.body
    );
    res.ok(data, "Produkti u modifikua me sukses!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
