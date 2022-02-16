const Product = require("../db/models/product");
const GeneralError = require("../utils/GeneralError");
const Branch = require("../db/models/branch");
const Category = require("../db/models/category");
const SellingUnit = require("../db/models/sellingunit");
const Supplier = require("../db/models/supplier");

const getProductsService = async () => {
  const data = await Product.findAll({
    where : {
      isActive: true,
      isDeleted: false,
    },
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
  return data;
};

const createProductService = async (product) => {
  const checkIfExists = await Product.findAll({
    where: {
      name: product.name,
      branchId: product.branchId,
    },
    raw: true,
  });
  if (
    checkIfExists.length !== 0 &&
    checkIfExists[0].isDeleted === 1 &&
    checkIfExists[0].isActive === 0
  ) {
    product.isDeleted = false;
    product.isActive = true;
    const productUpdate = await Product.update(product, {
      where: {
        name: product.name,
      },
    });
    return productUpdate;
  } else if (
    checkIfExists.length !== 0 &&
    checkIfExists[0].isDeleted === 0 &&
    checkIfExists[0].isActive === 1
  ) {
    throw new GeneralError(
      "Ekziston tashme nje produkt me kete emer per kete branch",
      409
    );
  }
  const data = await Product.create(product);
  return data;
};

const deleteProductService = async (id) => {
  const checkIfExists = await Product.findOne({
    where: {
      id,
    },
    raw: true,
  });

  if (!checkIfExists) {
    throw new GeneralError("Nuk ekziston nje produkt me kete id", 404);
  }

  const productToDelete = await Product.update(
    { isDeleted: true, isActive: false },
    {
      where: {
        id,
      },
    }
  );

  return productToDelete;
};

const updateProductService = async (id, data) => {
  const checkById = await Product.findOne({
    where: {
      id,
    },
    raw: true,
  });

  if (!checkById) {
    throw new GeneralError("Nuk ekziston nje produkt me kete id", 404);
  }

  const checkByName = await Product.findOne({
    where: {
      name: data.name,
      branchId: data.branchId,
    },
  });

  if (checkByName) {
    throw new GeneralError("Ekziston tashme nje produkt me kete emer!", 409);
  }

  const productToUpdate = await Product.update(data, {
    where: {
      id,
    },
  });
  return productToUpdate[0];
};

module.exports = {
  createProductService,
  deleteProductService,
  updateProductService,
  getProductsService,
};
