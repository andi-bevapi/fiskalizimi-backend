const { DataTypes } = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Categories",
      key: "id"
    }
  },
  barcode: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  stock: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  stockCheck: {
    type: DataTypes.BOOLEAN,
    // allowNull: true,
  },
  sellingUnit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
};
