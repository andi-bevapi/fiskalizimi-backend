const UserServices = require("../services/UserServices");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers(req.body);
    res.ok(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    // console.log("BODY=>", req.body);
    const createUser = await UserServices.createUser(req.body);
    // console.log(createUser);
    res.ok(createUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updateUser = await UserServices.updateUser(req.params.id, req.body);
    res.ok(updateUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await UserServices.deleteUser(req.params.id);
    res.ok(deleteUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
