const UserServices = require("../services/UserServices");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers(req.params.branchId);
    res.ok(users);
  } catch (error) {
    next(error);
  }
};

const getAllUsersByClientId = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsersByClientId(req.params.clientId);
    res.ok(users);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await UserServices.getCurrentUser(req.headers.authorization);
    res.ok(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const createdUser = await UserServices.createUser(req.body);
    res.ok(createdUser, "Perdoruesi u krijua me sukses");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserServices.updateUser(req.params.id, req.body);
    res.ok(updatedUser, "Perdoruesi u perditesua me sukses");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await UserServices.deleteUser(req.params.id);
    res.ok(deletedUser, "Perdoruesi u fshi me sukses!");
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

module.exports = { getAllUsers, getCurrentUser, createUser, updateUser, deleteUser, loginUser, getAllUsersByClientId };
