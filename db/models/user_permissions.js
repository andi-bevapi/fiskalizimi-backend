const { Model, DataTypes } = require('sequelize');

class User_Permissions extends Model {
  static init(sequelize) {
    super.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'User_Permissions'
    })
  }
}

module.exports = User_Permissions;