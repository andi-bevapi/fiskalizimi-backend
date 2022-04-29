const ArkaHistoryServices = require("../services/ArkaHistoryServices");

const getLastAmount = async (req, res, next) => {
  try {
    const records = await ArkaHistoryServices.getLastAmount(req.params.arkaId);
    res.ok(records);
  } catch (error) {
    next(error);
  }
};

const updateAmount = async (req, res, next) => {
  try {
    const newRecord = await ArkaHistoryServices.updateAmount(req.body);
    res.ok(newRecord);
  } catch (error) {
    next(error);
  }
};

module.exports = { getLastAmount, updateAmount };
