const Product = require("../db/models/product");
const Branch = require("../db/models/branch");
const Category = require("../db/models/category");
const SellingUnit = require("../db/models/sellingunit");
const Supplier = require("../db/models/supplier");
const productServices = require("../services/ProductServices");

const getProducts = async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [
        {
          model: Branch,
          as: "branch",
        },
        {
          model: Category,
          as: "category",
        },
        {
          model: SellingUnit,
          as: "sellingUnit",
        },
        {
          model: Supplier,
          as: "supplier",
        },
      ],
    });

    res.send({
      statusCode: 200,
      message: "Lista e produkteve",
      data,
    });
  } catch (error) {
    res.status(500).send();
  }
};

const createProduct = async (req, res) => {
  try {
    const data = await productServices.createProductService(req);
    if (data) {
      res.ok(data, "Produkti u krijua me sukses!")
    }
  } catch (error) {
    next(error)
  }
};

const deleteProduct = async (req, res) => {
  try {
    const data = await productServices.deleteProductService(req.params.id);
    if (data === 1) {
      res.ok(data, "Produkti u fshi me sukses!")
    }
  } catch (error) {
    next(error)
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const data = await productServices.updateProductService(
      req.params.id,
      req.body
    );
    return res.ok(data, "Produkti u modifikua me sukses!")
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
