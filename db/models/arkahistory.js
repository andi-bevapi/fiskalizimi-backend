const { Model, DataTypes, literal } = require("sequelize");

class ArkaHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        totalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        action: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        actionTime: {
          type: DataTypes.DATE,
          allowNull: false,
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
        modelName: "ArkaHistory",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Arka, { foreignKey: "arkaId", as: "arka" });
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

module.exports = ArkaHistory;
