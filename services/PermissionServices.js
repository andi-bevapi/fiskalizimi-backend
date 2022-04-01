const Permission = require("../db/models/permission");

const getAllPermissions = async () => {
  const allPermissions = await Permission.findAll({
    where: { isActive: true }, attributes: ["id", "name"]
  });
  return allPermissions;
};

const createPermissions = async () => {
  const permissions = [
    { name: 'permission.product.view' },
    { name: 'permission.product.create' },
    { name: 'permission.product.update' },
    { name: 'permission.product.delete' },
    { name: 'permission.branch.view' },
    { name: 'permission.branch.create' },
    { name: 'permission.branch.update' },
    { name: 'permission.branch.delete' },
    { name: 'permission.category.view' },
    { name: 'permission.category.create' },
    { name: 'permission.category.update' },
    { name: 'permission.category.delete' },
    { name: 'permission.supplier.view' },
    { name: 'permission.supplier.create' },
    { name: 'permission.supplier.update' },
    { name: 'permission.supplier.delete' },
    { name: 'permission.sellingUnit.view' },
    { name: 'permission.sellingUnit.create' },
    { name: 'permission.sellingUnit.update' },
    { name: 'permission.sellingUnit.delete' },
    { name: 'permission.user.view' },
    { name: 'permission.user.create' },
    { name: 'permission.user.update' },
    { name: 'permission.user.delete' },
    { name: 'permission.reports.view' },
  ]

  await Permission.bulkCreate(permissions);
  return permissions;
};

module.exports = { getAllPermissions, createPermissions };
