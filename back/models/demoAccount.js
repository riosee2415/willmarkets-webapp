const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class DemoAccount extends Model {
  static init(sequelize) {
    return super.init(
      {
        bankNo: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        platform: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        leverage: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tradePassword: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        viewPassword: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "DemoAccount",
        tableName: "demoAccounts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.DemoAccount.belongsTo(db.User);
  }
};
