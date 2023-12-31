const { Model, DataTypes, literal } = require('sequelize');

class InvoiceItem extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      finalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      originalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discountPerUnit: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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
      modelName: 'InvoiceItem'
    })
  }

  static associate(models) {
    this.belongsTo(models.Invoice, { foreignKey: 'invoiceId', as: 'items' });
    this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}

module.exports = InvoiceItem;