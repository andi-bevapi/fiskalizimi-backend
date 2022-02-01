const { Model, DataTypes } = require('sequelize');

class Client extends Model {
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
      NUIS: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logoVirtualPath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hasVat: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      vat: {
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
      TCRCode: {
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
      typeOfTCR: {
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
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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