const { Model, DataTypes } = require('sequelize');

class TransportOrder extends Model {
  static init(sequelize) {
    super.init({
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transportTransaction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transportDatetime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      totalValue: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      packNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      WTNIC: {
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
      modelName: 'TransportOrder'
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = TransportOrder;