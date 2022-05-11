const { Model, DataTypes, literal } = require('sequelize');

class Configuration extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      printer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      allowSellsWithZero: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      billMessage:{
        type: DataTypes.STRING,
        allowNull: true
      },
      billDescription:{
        type: DataTypes.STRING,
        allowNull: true
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
      modelName: 'Configuration'
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = Configuration;