const { DataTypes } = require("sequelize");

module.exports = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ticket_reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticket_order_list:{
      type:DataTypes.TEXT
  }
};