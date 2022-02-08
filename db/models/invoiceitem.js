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
        type: DataTypes.STRING,
        allowNull: false
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
      modelName: 'InvoiceItem'
    })
  }

  static associate(models) {
    this.belongsTo(models.Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
    this.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    this.belongsTo(models.SellingUnit, { foreignKey: 'sellingUnitId', as: 'sellingUnit' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = InvoiceItem;