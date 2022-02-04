const { Model, DataTypes } = require('sequelize');

class Invoice extends Model {
  static init(sequelize) {
    super.init({
      invoiceCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalVat: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hasPayDeadline: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      payDeadline: {
        type: DataTypes.DATE,
        allowNull: false
      },
      isReturn: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      NSLF: {
        type: DataTypes.STRING,
        allowNull: false
      },
      FIC: {
        type: DataTypes.STRING,
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
      }
    }, {
      sequelize,
      modelName: 'Invoice'
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = Invoice;