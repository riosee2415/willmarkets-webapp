const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Deposit extends Model {
  static init(sequelize) {
    return super.init(
      {
        bankName: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        bankNo: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        swiftCode: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        willAddress: {
          type: DataTypes.STRING(500),
          allowNull: true,
          defaultValue: null,
        },
        bankAddress: {
          type: DataTypes.STRING(500),
          allowNull: true,
          defaultValue: null,
        },
        selectBank: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        priceType: {
          type: DataTypes.STRING(100),
          allowNull: true,
          defaultValue: null,
        },
        walletAddress: {
          type: DataTypes.STRING(500),
          allowNull: true,
          defaultValue: null,
        },
        hashAddress: {
          type: DataTypes.STRING(500),
          allowNull: true,
          defaultValue: null,
        },
        filePath: {
          type: DataTypes.STRING(600),
          allowNull: true,
          defaultValue: null,
        },
        fileOriginName: {
          type: DataTypes.STRING(300),
          allowNull: true,
          defaultValue: null,
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
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Deposit.belongsTo(db.User);
  }
};
