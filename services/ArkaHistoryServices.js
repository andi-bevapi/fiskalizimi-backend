const arkaHistory = require("../db/models/arkahistory");
const user = require('../db/models/user');
const Op = require("sequelize").Op;

const getLastAmount = async (arkaId) => {
  const getLastRecord = await arkaHistory.findOne({
    where: { arkaId },
    order: [["createdAt", "DESC"]],
  });
  return getLastRecord;
};

const updateAmount = async (body) => {
  const newRecord = await arkaHistory.create(body);
  return newRecord;
};

const getArkaHistory = async (arkaId) => {
  const history = await arkaHistory.findAll({
    where: {
      arkaId,
      actionTime: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
        [Op.lt]: new Date(),
      },
    },
    attributes: {exclude: ['createdAt', 'updatedAt', 'arkaId', 'userId']},
    include: [
      {
        model: user,
        as: "user",
        attributes: ['username']
      },
    ],

    
  });
  return history;
};
module.exports = { getLastAmount, updateAmount, getArkaHistory };
