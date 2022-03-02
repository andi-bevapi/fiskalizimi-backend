const UserServices = require("../services/UserServices");
const UserBranchesController = require("./UserBranchesController");
const UserBranchesServices = require("../services/UserBranchesServices");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers(req.params.clientId);
    const branches = await UserBranchesServices.getUserBranches(req.params.clientId);
    res.ok(users, branches);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await UserServices.getCurrentUser(req.headers.authorization);
    res.ok(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    console.log("BODY==", req.body);
    const createUser = await UserServices.createUser(req.body);
    console.log("CREATEDUSER UC=", createUser.dataValues);
    const createUserBranches = await UserBranchesServices.createUserBranches(createUser.dataValues, req.body.branches);
    // UserBranchesController.createUserBranches(createUser.dataValues);
    console.log(createUserBranches);
    res.ok(createUser, "Perdoruesi u krijua me sukses");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updateUser = await UserServices.updateUser(req.params.id, req.body);
    const updateUserBranches = await UserBranchesServices.updateUserBranches(req.params.id, req.body);
    res.ok(updateUser, "Perdoruesi u perditesua me sukses");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await UserServices.deleteUser(req.params.id);
    const deleteUserBranches = await UserBranchesServices.deleteUserBranches(req.params.id);
    res.ok(deleteUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const response = await UserServices.login(req.body.username, req.body.password);
    res.ok(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getCurrentUser, createUser, updateUser, deleteUser, loginUser };
