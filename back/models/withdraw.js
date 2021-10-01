const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Withdraw extends Model {
  static init(sequelize) {
    return super.init(
      {
        bankName: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        swiftCode: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        bankAddress: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        selectBank: {
          // 출금 계좌 -> 출금 계좌는 내 지갑과 내 라이브 계좌중 선택합니다.
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        bankNo: {
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
