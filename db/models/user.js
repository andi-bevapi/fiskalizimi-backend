const { Model, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      operatorCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isFirstTimeLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
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
      modelName: 'User'
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    this.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
    this.belongsToMany(models.Permission, { through: 'User_Permissions', as: 'permissions' });
  }
}

User.prototype.generateAuthToken = function() {
  const payload = { id: this.id, username: this.username, operatorCode: this.operatorCode, email: this.email, position: this.position, phone: this.phone, firstName: this.firstName, lastName: this.lastName, clientId: this.clientId, branchId: this.branchId };

  const token = jwt.sign(
    payload,
    'fiskalizimisecretkey',
    { expiresIn: 3600 }
  );

  return token;
};

module.exports = User;