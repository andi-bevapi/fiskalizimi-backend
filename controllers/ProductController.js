const productServices = require("../services/ProductServices");

const getProducts = async (req, res, next) => {
  try {
    const data = await productServices.getProductsService(req.params.branchId, req.query);
    res.ok(data, "Lista e produkteve");
  } catch (error) {
    next(error);
  }
};

const getProductsByClientId = async (req, res, next) => {
  try {
    const data = await productServices.getProductsServiceByClientId(req.params.clientId, req.query);
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

const updateProduct = async (req, res, next) => {
  try {
    const data = await productServices.updateProductService(
      req.params.id,
      req.body
    );
    
    res.ok(data, "Produkti u perditesua me sukses!");
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

const getProductByBarcode = async (req, res, next) => {
  try{
    const data = await productServices.getProductByBarcodeService(req.params.barcode);
    res.ok(data, "Produkti me barcode-in e specifikuar");
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByBarcode,
  getProductsByClientId
};
