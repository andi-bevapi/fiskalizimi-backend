const Product = require("../db/models/product");
const GeneralError = require("../utils/GeneralError")

const createProductService = async (req) => {
  const checkIfExists = await Product.findAll({
    where: {
      name: req.body.name,
      branchId: req.body.branchId,
    },
  });

  if (checkIfExists.length !== 0) {
    throw new GeneralError("Ekziston tashme nje produkt me kete emer!", 409);
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
    throw new GeneralError("Nuk ekziston nje produkt me kete id", 404);
  }

  // When deleting a product, will the record be deleted or only updated to 
  // { isDeleted: true, isActive: false },
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
   throw new GeneralError("Fshirja e produktit deshtoi!", 500);
};

const updateProductService = async (id, data) => {
  const checkById = await Product.findOne({
    where: {
      id: id,
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
  throw new GeneralError("Modifikimi i produkti deshoti!", 500);
};

module.exports = {
  createProductService,
  deleteProductService,
  updateProductService,
};
