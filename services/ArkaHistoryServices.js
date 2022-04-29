const arkaHistory = require("../db/models/arkahistory");

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

module.exports = { getLastAmount, updateAmount };
