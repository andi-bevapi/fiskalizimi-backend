const ShiftHistory = require("../db/models/shifthistory");
const Op = require("sequelize").Op;
const Arka_Shifts = require("../db/models/arka_shifts");

const getTodayShift = async (userId) => {
  const todaysShift = ShiftHistory.findOne({
    where: {
      userId,
      shiftStart: {
        [Op.gt]: new Date().setHours(0, 0, 0, 0),
        [Op.lt]: new Date(),
      },
    },
  });
  return todaysShift;
};

const createShift = async (body) => {
  const newShift = await ShiftHistory.create(body, { shiftStart: new Date() });
  await Arka_Shifts.create({arkaId: 1, shiftId: newShift.id});
  return newShift;
};

const updateShift = async (userId) => {
  const updatedShift = await ShiftHistory.update(
    { shiftEnd: new Date() },
    {
      where: {
        userId,
        shiftStart: {
          [Op.gt]: new Date().setHours(0, 0, 0, 0),
          [Op.lt]: new Date(),
        },
      },
    }
  );
  return updatedShift;
};

module.exports = { getTodayShift, createShift, updateShift };
