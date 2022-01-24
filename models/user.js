const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstTimeLogin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
  manageProductsStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
  manageCategories: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
  manageTransactions: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
  manageUsers: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
  manageConfigurations: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false
  },
});

module.exports = User;