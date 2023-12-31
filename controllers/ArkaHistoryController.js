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

const getArkaHistory = async (req, res, next) => {
  try {
    const history = await ArkaHistoryServices.getArkaHistory(req.params.arkaId, req.query.startDate, req.query.endDate);
    res.ok(history);
  } catch (error) {
    next(error);
  }
}

const autoInsertDeclaration = async (req, res, next) => {
  try {
    const result = await ArkaHistoryServices.autoInsertDeclaration(req.body);
    res.ok(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getLastAmount, updateAmount, getArkaHistory , autoInsertDeclaration };
