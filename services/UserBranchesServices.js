const UserBranches = require("../db/models/userbranches");
const GeneralError = require("../utils/GeneralError");

const getUserBranches = async () => {
  // console.log(user);
  // console.log(branches);
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
  let allBranches = await UserBranches.findAll(
    { where: { userId: id } },
    { raw: true }
  );
  let newBranchesId = user.branches;
  for (var branch of user.branches) {
    const userBranch = await UserBranches.findAll(
      { where: { userId: id, branchId: branch } },
      { raw: true }
    );
    if (userBranch.length > 0) {
      allBranches = allBranches.filter(
        (el) => el.dataValues.id != userBranch[0].id
      );
      newBranchesId = newBranchesId.filter((el) => el != branch);
    }
  }
  console.log("allBranches", allBranches);
  console.log("NEW BRANCH ID", newBranchesId);
  if (allBranches.length == newBranchesId.length) {
    let index = 0;
    for (var branch of allBranches) {
      const userToUpdate = await UserBranches.update(
        { branchId: newBranchesId[index] },
        {
          where: {
            id: branch.dataValues.id,
          },
        }
      );
      index++;
    }
  }
  if (allBranches.length > newBranchesId.length) {
    console.log("DELETE USER BRANCHES");
    for (var branch of allBranches) {
      console.log("BRANCH ID", branch.dataValues.id);
      const userBranchToDelete = await UserBranches.destroy({
        where: { id: branch.dataValues.id, userId: id },
      });
      console.log(userBranchToDelete);
    }
  }
  if (allBranches.length < newBranchesId.length) {
    console.log("NEW BRANCHES");
    for (var newBranchId of newBranchesId) {
      const newUserBranch = await UserBranches.create({
        userId: id,
        branchId: newBranchId,
      });
    }
  }
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
