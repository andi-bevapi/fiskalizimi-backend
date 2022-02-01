const { Model, DataTypes } = require('sequelize');

class Branch extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      businUnitCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      maintainerCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
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
      modelName: 'Branch'
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
  }
}

module.exports = Branch;