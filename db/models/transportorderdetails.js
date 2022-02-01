const { Model, DataTypes } = require('sequelize');

class TransportOrderDetails extends Model {
  static init(sequelize) {
    super.init({
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
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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