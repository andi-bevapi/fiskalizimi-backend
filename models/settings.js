const { DataTypes } = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nipt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
  },
  footer: {
    type: DataTypes.STRING,
  },
  tvsh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 20
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    default: "SHQIP"
  },
  printer: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};
