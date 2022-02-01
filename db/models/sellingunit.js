const { Model, DataTypes } = require('sequelize');

class SellingUnit extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'SellingUnit'
    })
  }
}

module.exports = SellingUnit;