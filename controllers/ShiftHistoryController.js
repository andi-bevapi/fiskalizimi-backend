const ShiftHistoryServices = require("../services/ShiftHistoryServices");

const getTodayShift = async (req, res, next) => {
  try {
    const today = await ShiftHistoryServices.getTodayShift(req.params.userId);
    res.ok(today);
  } catch (error) {
    next(error);
  }
};

const createShift = async (req, res, next) => {
  try {
    const newShift = await ShiftHistoryServices.createShift(req.body);
    res.ok(newShift);
  } catch (error) {
    next(error);
  }
};

const updateShift = async (req, res, next) => {
  try {
    const updatedShift = await ShiftHistoryServices.updateShift(
      req.params.userId
    );
    res.ok(updatedShift);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodayShift, createShift, updateShift };
