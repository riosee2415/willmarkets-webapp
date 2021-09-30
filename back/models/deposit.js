const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Deposit extends Model {
  static init(sequelize) {
    return super.init(
      {
        bankName: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        bankNo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        swiftCode: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        willAddress: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        bankAddress: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        selectBank: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
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
        modelName: "Deposit",
        tableName: "deposits",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
