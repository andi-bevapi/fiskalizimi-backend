const UserBranchesServices = require("../services/UserBranchesServices");

const getUserBranches = async (req, res, next) => {
  try {
    console.log("ON the UserBranch Controller*-*-*-*--**--*-");
    const createUserBranches = await UserBranchesServices.getUserBranches();
    console.log("createUserBranches==", createUserBranches);
    res.ok(createUserBranches, "Perdoruesi u krijua me sukses");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createUserBranches = async (req, res, next) => {
  try {
    console.log("here");
    console.log(req.body);
    const createUserBranches = await UserBranchesServices.createUserBranches(
      req.body.user,
      req.body.branches
    );
    console.log("createUserBranches==", createUserBranches);
    return createUserBranches;
    // res.ok(createUser, "Perdoruesi u krijua me sukses");
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserBranches, createUserBranches };
