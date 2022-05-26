const { Model, DataTypes, literal } = require('sequelize');

class Client extends Model {
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
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      NUIS: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logoVirtualPath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numberOfUsers: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      softCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false
      },
      certificate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      validFrom: {
        type: DataTypes.DATE,
        allowNull: false
      },
      validTo: {
        type: DataTypes.DATE,
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
      modelName: 'Client'
    })
  }

  static associate(models) {
    this.hasMany(models.Branch, { foreignKey: 'clientId', as: 'branches' });
  }
}

module.exports = Client;