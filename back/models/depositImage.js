const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class DepositImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        filePath: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        fileOriginName: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        selectBank: {
          type: DataTypes.STRING(200),
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        modelName: "DepositImage",
        tableName: "depositImages",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.DepositImage.belongsTo(db.User);
  }
};
