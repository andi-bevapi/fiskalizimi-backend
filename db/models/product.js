const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stock: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stockCheck: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      imageVirtualPath: {
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
      modelName: 'Product'
    })
  }

  static associate(models) {
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    this.belongsTo(models.SellingUnit, { foreignKey: 'sellingUnitId', as: 'sellingUnit' });
    this.belongsTo(models.Supplier, { foreignKey: 'supplierId', as: 'supplier' });
  }
}

module.exports = Product;