const { Model, DataTypes, literal } = require('sequelize');

class TransportOrderDetails extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      startAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startCity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startPoint: {
        type: DataTypes.DATE,
        allowNull: false
      },
      startDateTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      destinationAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destinationCity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destinationPoint: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destinationDateTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      vehiclePlates: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carrierName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carrierAddress: {
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
      modelName: 'TransportOrderDetails'
    })
  }

  static associate(models) {
    this.belongsTo(models.TransportOrder, { foreignKey: 'transportOrderId', as: 'transportOrder' });
  }
}

module.exports = TransportOrderDetails;