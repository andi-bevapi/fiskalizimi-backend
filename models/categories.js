const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");


const Category = sequelize.define("category",{
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Category