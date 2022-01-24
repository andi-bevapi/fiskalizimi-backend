const { DataTypes } = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cashier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  products: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paid: {
    type: DataTypes.INTEGER,
  },
  change: {
    type: DataTypes.INTEGER,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoice: {
    type: DataTypes.INTEGER,
  }
};
