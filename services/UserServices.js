const User = require("../db/models/user");
const User_Permissions = require("../db/models/user_permissions");
const GeneralError = require("../utils/GeneralError");

const getAllUsers = async (branchId) => {
  const allUsers = await User.findAll({
    where: { isActive: true, branchId: branchId },
  });
  return allUsers;
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
  const newUser = await User.create(user.user, { raw: true });

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

  const userToUpdate = await User.update(user.user, {
    where: {
      id,
    },
  });
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

  return userToDelete;
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
