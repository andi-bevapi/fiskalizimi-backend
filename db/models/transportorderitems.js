const { Model, DataTypes } = require('sequelize');

class TransportOrderItems extends Model {
  static init(sequelize) {
    super.init({
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.BIGINT,
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
      modelName: 'TransportOrderItems'
    })
  }

  static associate(models) {
    this.belongsTo(models.TransportOrder, { foreignKey: 'transportOrderId', as: 'transportOrder' });
    this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    this.belongsTo(models.SellingUnit, { foreignKey: 'sellingUnitId', as: 'sellingUnit' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = TransportOrderItems;