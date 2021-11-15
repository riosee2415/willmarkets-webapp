const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Withdraw extends Model {
  static init(sequelize) {
    return super.init(
      {
        bankName: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
        },
        swiftCode: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        bankAddress: {
          type: DataTypes.STRING(500),
          allowNull: true,
          defaultValue: null,
        },
        selectBank: {
          // 출금 계좌 -> 출금 계좌는 내 지갑과 내 라이브 계좌중 선택합니다.
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
        bankNo: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
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
        modelName: "Withdraw",
        tableName: "withdraws",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Withdraw.belongsTo(db.User);
  }
};
