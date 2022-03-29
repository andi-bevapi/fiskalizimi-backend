const User = require("../db/models/user");
const GeneralError = require("../utils/GeneralError");

const Permission = require("../db/models/permission");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");
const User_Permissions = require("../db/models/user_permissions");
const jwt = require("jsonwebtoken");

const getAllUsers = async (branchId) => {
  const allUsers = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { isActive: true, branchId },
    joinTableAttributes: ['permissionId'],
    include: [
      {
        model: Permission,
        as: "permissions",
      },
    ],
  });
  return allUsers;
};

const getCurrentUser = async (token) => {
  token = token.split(" ")[1];
  const decodedUser = jwt.decode(token);

  if (!decodedUser) throw new GeneralError("Ky perdorues nuk u gjet!", 404);

  const user = await User.findOne({
    where: { id: decodedUser.id, isActive: true },
    include: [
      {
        model: Permission,
        as: "permissions",
        attributes: [
          "name",
          [sequelize.fn("GROUP_CONCAT", sequelize.col("name")), "name"],
        ],
        group: ["name"],
      },
    ],
  });

  if (user.id === null) throw new GeneralError("Ky perdorues nuk u gjet", 404); // To review

  const newUser = user.toJSON();

  if (newUser.permissions.length > 0)
    newUser.permissions = newUser.permissions[0].name.split(",");

  return newUser;
};

const createUser = async (user) => {
  const checkIfUsernameExist = await User.findOne({
    where: { isActive: true, username: user.user.username },
  });

  if (checkIfUsernameExist) {
    throw new GeneralError("Ky username eshte perdorur", 409);
  }

  const checkIfOperatorCodeExist = await User.findOne({
    where: { isActive: true, operatorCode: user.user.operatorCode },
  });

  if (checkIfOperatorCodeExist) {
    throw new GeneralError("Ky operator code eshte perdorur", 409);
  }

  var hashed = await bcrypt.hash(user.user.password, 10);
  user.user.password = hashed;

  const newUser = await User.create(user.user, { raw: true });

  const userPermissions = user.permissions.map((permissionId) => ({
    userId: newUser.id,
    permissionId,
  }));
  await User_Permissions.bulkCreate(userPermissions);

  return newUser;
};

const updateUser = async (id, user) => {
  const checkById = await User.findOne({
    where: {
      id,
    },
    raw: true,
  });

  if (!checkById) {
    throw new GeneralError("Nuk ekziston nje perdorues me kete id", 404);
  }

  const checkByName = await User.findOne({
    where: {
      username: user.user.username,
      isDeleted: false,
      isActive: true,
    },
    raw: true,
  });

  if (checkByName && checkById.id != checkByName.id) {
    throw new GeneralError("Ekziston tashme nje perdorues me kete emer!", 409);
  }

  var hashed = await bcrypt.hash(user.user.password, 10);
  user.user.password = hashed;

  const userToUpdate = await User.update(user.user, {
    where: {
      id,
    },
  });

  await User_Permissions.destroy({ where: { userId: id } });

  const userPermissions = user.permissions.map((permissionId) => ({
    userId: id,
    permissionId,
  }));
  await User_Permissions.bulkCreate(userPermissions);

  return userToUpdate[0];
};

const deleteUser = async (id) => {
  const checkIfExists = await User.findOne({
    where: {
      id,
    },
    raw: true,
  });

  if (!checkIfExists) {
    throw new GeneralError("Nuk ekziston nje perdorues me kete id", 404);
  }

  const userToDelete = await User.update(
    { isDeleted: true, isActive: false },
    {
      where: {
        id,
      },
    }
  );

  await User_Permissions.destroy({ where: { userId: id } });

  return userToDelete;
};

const login = async (username, password) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new GeneralError("Nuk ekziston nje perdorues me kete username", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = await user.generateAuthToken();
    return token;
  } else {
    throw new GeneralError("Fjalekalim i gabuar", 400);
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
