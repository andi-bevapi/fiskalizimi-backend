const Product = require("../db/models/product");
const Branch = require("../db/models/branch");
const Category = require("../db/models/category");
const SellingUnit = require("../db/models/sellingunit");
const Supplier = require("../db/models/supplier");

const createProductService = async (req) => {
  const checkIfExists = await Product.findAll({
    where: {
      name: req.body.name,
      branchId: req.body.branchId,
    },
  });

  if (checkIfExists.length !== 0) {
    throw new Error("ky produkt ekziston");
    // return res.status(409).send({
    //   statusCode: 409,
    //   message: "Ky produkt ekziston aktualisht!",
    //   checkIfExists,
    // });
  }

  const data = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    barcode: req.body.barcode,
    stock: req.body.stock,
    stockCheck: req.body.stockCheck,
    imageVirtualPath: req.body.imageVirtualPath,
    isActive: true,
    isDeleted: false,
    branchId: 1,
    categoryId: req.body.categoryId,
    sellingUnitId: 1,
    supplierId: 1,
    branchId: req.body.branchId,
    raw: true,
  });

  return data;
};

const deleteProductService = async (id) => {
  const checkIfExists = await Product.findOne({
    where: {
      id: id,
    },
    raw: true,
  });

  if (!checkIfExists) {
    throw new Error("Nuk ekziston nje produkt me kete id");
  }

  // const productToDelete = await Product.update(
  //   { isDeleted: true, isActive: false },
  //   {
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // );

  const productToDelete = await Product.destroy({
    where: {
      id: id,
    },
  });

  if (productToDelete === 1) {
    return productToDelete;
  }
  return null;
};

const updateProductService = async (id, data) => {
  const checkById = await Product.findOne({
    where: {
      id: id,
    },
    raw: true,
  });

  if (!checkById) {
    throw new Error("Nuk ekziston nje produkt me kete id");
  }

  const checkByName = await Product.findOne({
    where: {
      name: data.name,
      branchId: data.branchId,
    },
  });

  if (checkByName) {
    throw new Error("Ekziston tashme nje produkt me kete emer!");
  }

  const productToUpdate = await Product.update(
    {
      name: data.name,
      description: data.description,
      price: data.price,
      barcode: data.barcode,
      stock: data.stock,
      stockCheck: data.stockCheck,
      imageVirtualPath: data.imageVirtualPath,
      categoryId: data.categoryId,
    },
    {
      where: {
        id: id,
      },
    }
  );
  if (productToUpdate[0] === 1) {
    return productToUpdate[0];
  }
  throw new Error("Modifikimi i produkti deshoti!");
};

module.exports = {
  createProductService,
  deleteProductService,
  updateProductService,
};
