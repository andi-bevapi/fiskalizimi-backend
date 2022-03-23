const permission = require("../db/models/permission");

const getAllPermissions = async () => {
  const allPermissions = await permission.findAll({
    where: { isActive: true }, attributes: ["id", "name"]
  });
  return allPermissions;
};

module.exports = { getAllPermissions };
