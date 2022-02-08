const { Model, DataTypes, literal } = require('sequelize');

class TransportOrderItems extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
        allowNull: false,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
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