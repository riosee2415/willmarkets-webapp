const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class PriceHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        bankNo: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "PriceHistory",
        tableName: "priceHistorys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.PriceHistory.belongsTo(db.User);
  }
};
