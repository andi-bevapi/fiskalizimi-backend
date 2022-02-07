const { Model, DataTypes } = require('sequelize');

class Permission extends Model {
  static init(sequelize) {
    super.init({
      name: {
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
      modelName: 'Permission'
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { through: 'User_Permissions' });
  }
}

module.exports = Permission;