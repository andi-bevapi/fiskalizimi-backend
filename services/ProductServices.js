const Product = require("../db/models/product");
const GeneralError = require("../utils/GeneralError");
const Branch = require("../db/models/branch");
const Category = require("../db/models/category");
const SellingUnit = require("../db/models/sellingunit");
const Supplier = require("../db/models/supplier");
const { cloudinary } = require('../config/cloudinary');
const { Op } = require('sequelize');

const getProductsService = async (branchId, { categoryId, sellingUnitId, supplierId, searchText = "" }) => {
  const data = await Product.findAll({
    where: {
      isActive: true,
      isDeleted: false,
      branchId,
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + searchText + "%",
          }
        }
      ],
    },
    include: [
      {
        model: Branch,
        as: "branch",
      },
      {
        model: Category,
        as: "category",
        where: categoryId && {
          id: categoryId
        }
      },
      {
        model: SellingUnit,
        as: "sellingUnit",
        where: sellingUnitId && {
          id: sellingUnitId
        }
      },
      {
        model: Supplier,
        as: "supplier",
        where: supplierId && {
          id: supplierId
        }
      },
    ],
  });
  return data;
};

const getProductByBarcodeService = async (barcode) => {
  const product = await Product.findOne({
    where: {
      isActive: true,
      isDeleted: false,
      barcode,       
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

  if(!product) {
    throw new GeneralError("Produkt me kete barkod nuk ekziston!", 404);
  }

  return product;
};

const createProductService = async (product) => {
  const checkIfExists = await Product.findAll({
    where: {
      name: product.name,
      branchId: product.branchId,
      isDeleted: false,
    },
    raw: true,
  });

  if (checkIfExists.length > 0) {
    throw new GeneralError("Ekziston tashme nje produkt me kete emer", 409);
  }

  let uploadResponse = null;

  if(product.imageVirtualPath) {
    uploadResponse = await cloudinary.uploader.upload(product.imageVirtualPath, {
      upload_preset: 'posla_dev'
    });
  }

  const data = await Product.create({
    ...product,
    imageVirtualPath: uploadResponse ? uploadResponse.secure_url : null
  });

  return data;
};

const updateProductService = async (id, data) => {
  const checkById = await Product.findOne({
    where: {
      id
    },
    raw: true,
  });

  if (!checkById) {
    throw new GeneralError("Nuk ekziston nje produkt me kete id", 404);
  }

  let uploadResponse = null;

  if(data.imageVirtualPath) {
    uploadResponse = await cloudinary.uploader.upload(data.imageVirtualPath, {
      upload_preset: 'posla_dev'
    });
  }

  const productToUpdate = await Product.update({
    ...data,
    imageVirtualPath: uploadResponse ? uploadResponse.secure_url : null
  }, {
    where: {
      id,
    },
  });

  return productToUpdate[0];
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

module.exports = {
  createProductService,
  deleteProductService,
  updateProductService,
  getProductsService,
  getProductByBarcodeService
};
