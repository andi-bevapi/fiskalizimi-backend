const UserServices = require("../services/UserServices");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers(req.params.branchId);
    res.ok(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const createUser = await UserServices.createUser(req.body);
    res.ok(createUser, "Perdoruesi u krijua me sukses");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updateUser = await UserServices.updateUser(req.params.id, req.body);
    res.ok(updateUser, "Perdoruesi u perditesua me sukses");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await UserServices.deleteUser(req.params.id);
    res.ok(deleteUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
