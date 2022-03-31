const Configuration = require("../db/models/configuration");
const GeneralError = require("../utils/GeneralError");

const getConfigurations = async (branchId) => {
  const configurations = await Configuration.findAll({ where: { branchId } });
  return configurations;
};

const createConfiguration = async (body) => {
  let doesExists = false;

  if (body.id) {
    doesExists = await Configuration.findOne({
      where: {
        id: body.id,
      },
    });
  }

  if (doesExists) {
    await Configuration.update(
      {
        ...body,
      },
      {
        where: {
          id: body.id,
        },
      }
    );
    const updatedConfiguration = await Configuration.findOne({
      where: {
        id: body.id,
      },
    });
    return updatedConfiguration;
  }

  const newConfigurations = await Configuration.create({ ...body });
  return newConfigurations;
};

module.exports = { getConfigurations, createConfiguration };
