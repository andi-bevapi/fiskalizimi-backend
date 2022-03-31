const { Model, DataTypes, literal } = require('sequelize');

class Invoice extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      invoiceCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalAmountNoVAT: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalVat: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalVat6: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalVat20: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discount: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hasPayDeadline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      payDeadline: {
        type: DataTypes.DATE
      },
      isReturn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      NSLF: {
        type: DataTypes.STRING
      },
      FIC: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
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
      modelName: 'Invoice'
    })
  }

  static associate(models) {
    this.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', as: 'items' });
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = Invoice;