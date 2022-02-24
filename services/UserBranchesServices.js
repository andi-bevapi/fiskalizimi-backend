const UserBranches = require("../db/models/userbranches");
const GeneralError = require("../utils/GeneralError");

const getUserBranches = async () => {
  // console.log(user);
  // console.log(branches);
  const allBranches = await UserBranches.findAll();
  console.log("ALL BRANCHES==", allBranches);
  console.log("before create");
  return allBranches;
};

const createUserBranches = async (user, branches) => {
  let newBranches = [];
  for (const branch of branches) {
    const newUserBranch = await UserBranches.create({
      userId: user.id,
      branchId: branch,
    });
    console.log("newUserBranch==", newUserBranch);
    newBranches.push(newUserBranch);
  }

  return newBranches;
};

const updateUserBranches = async (id, user) => {
  const allBranches = await UserBranches.findAll({where: {userId: id}}, {raw: true});
  console.log(allBranches);
};

const deleteUserBranches = async (id) => {
  const deleteBranches = await UserBranches.destroy({ where: { userId: id } });

  return deleteBranches;
};

module.exports = {
  getUserBranches,
  createUserBranches,
  updateUserBranches,
  deleteUserBranches,
};
