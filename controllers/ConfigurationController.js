const ConfigurationServices = require("../services/ConfigurationServices");

const getConfigurations = async (req, res, next) => {
  try {
    const configurations = await ConfigurationServices.getConfigurations(
      req.params.branchId
    );
    res.ok(configurations);
  } catch (error) {
    next(error);
  }
};

const createConfiguration = async (req, res, next) => {
  try {
    const configurations = await ConfigurationServices.createConfiguration(
      req.body
    );
    res.ok(configurations, "Konfigurimet u perditesuan me sukses");
  } catch (error) {
    next(error);
  }
};

module.exports = { getConfigurations, createConfiguration };
