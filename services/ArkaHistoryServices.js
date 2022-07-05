const arkaHistory = require("../db/models/arkahistory");
const GeneralError = require("../utils/GeneralError");
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
  const { arkaId, userId} = body;
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  // const checkArkAction = await arkaHistory.findOne({
  //   where: {
  //           arkaId,
  //           userId,
  //           action: 'Gjendje Fillestare',
  //           createdAt: {
  //               [Op.gt]: TODAY_START,
  //               [Op.lt]: NOW
  //           }
  //         }
  //     });
  //   if(checkArkAction){
  //     throw new GeneralError("Ky aksion eshte selektuar me pare", 409);
  //   } else{
      return await arkaHistory.create(body);
    // }
};

const autoInsertDeclaration = async (body) =>{
  //nese eshte ora 23:59 dhe nuk ka ne tabele per ate dite rekord me action: 'Gjendje Fillestare' bej update ,
  //by default do behet inser me vleren 0

  const arkaId = body.item.id;
  const userId = body.userId;

  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const MID_NIGHT = new Date().setHours(23,59,59,59);
  const WHEN_USER_DECIDE = new Date().getTime();

  const todayAction = await arkaHistory.findAll({
    where:{
        arkaId : arkaId,
        action: 'Gjendje Fillestare',
        createdAt:{
          [Op.gt]: TODAY_START
      }
    }
  });

  if(todayAction.length > 0){
    throw new GeneralError("Ky aksion eshte selektuar me pare", 409);
  } else if(MID_NIGHT === WHEN_USER_DECIDE && !todayAction){
    return await arkaHistory.create({
      totalAmount : 0,
      arkaId,
      userId
    });
  }
 
  return todayAction;
}

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
module.exports = { getLastAmount, updateAmount, getArkaHistory , autoInsertDeclaration };
