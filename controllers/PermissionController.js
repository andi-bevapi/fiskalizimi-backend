const PermissionServices = require("../services/PermissionServices");

const getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await PermissionServices.getAllPermissions();
    res.ok(permissions);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPermissions };
