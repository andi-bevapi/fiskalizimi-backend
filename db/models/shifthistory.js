const { Model, DataTypes, literal } = require("sequelize");

class ShiftHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        shiftStart: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        shiftEnd: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        modelName: "ShiftHistory",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    this.belongsToMany(models.Arka, { through: 'Arka_Shifts' });
  }
}

module.exports = ShiftHistory;
