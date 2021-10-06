const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userType: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        zoneCode: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        priceWallet: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        idType: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        idDate1: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        idDate2: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        idFilePath: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        idFileOriginName: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        addrType: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        addrFilePath: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        addrFileOriginName: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        secret: {
          type: DataTypes.STRING(10),
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
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Deposit);
    db.User.hasMany(db.DepositImage);
    db.User.hasMany(db.Withdraw);
    db.User.hasMany(db.LiveAccount);
    db.User.hasMany(db.DemoAccount);
  }
};
