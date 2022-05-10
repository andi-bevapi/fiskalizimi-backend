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

const getArkaHistory = async (arkaId, startDate, endDate) => {
  const start = new Date(startDate).setHours(0,0,0,0);
  const end = new Date(endDate).setHours(23,59,59,59);
  const history = await arkaHistory.findAll({
    where: {
      arkaId,
      actionTime: {
        [Op.gt]: start,
        [Op.lt]: end,
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
