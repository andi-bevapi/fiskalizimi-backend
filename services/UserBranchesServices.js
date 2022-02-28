const UserBranches = require("../db/models/userbranches");
const GeneralError = require("../utils/GeneralError");

const getUserBranches = async () => {
  const allBranches = await UserBranches.findAll();
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
  const deleteBranches = await UserBranches.destroy({ where: { userId: id } });
  let newBranches = [];

  for (const branch of user.branches) {
    const newUserBranch = await UserBranches.create({
      userId: id,
      branchId: branch,
    });
    newBranches.push(newUserBranch);
  }
  return newBranches;
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
