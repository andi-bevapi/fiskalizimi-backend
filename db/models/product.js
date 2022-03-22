const { Model, DataTypes, literal } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
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
      vat: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING
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