const { Model, DataTypes, literal } = require('sequelize');

class Arka extends Model {
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
        allowNull: false
      },
      serialNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      validFrom: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      validTo: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      TCRCODE: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'Arka'
    })
  }

  static associate(models) {
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
  }
}

module.exports = Arka;