const Sequelize = require("sequelize");
const user = require("./user");
const question = require("./question");
const deposit = require("./deposit");
const depositImage = require("./depositImage");
const demoAccount = require("./demoAccount");
const liveAccount = require("./liveAccount");
const withdraw = require("./withdraw");
const popup = require("./popup");
const priceHistory = require("./priceHistory");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = user;
db.Question = question;
db.Deposit = deposit;
db.DepositImage = depositImage;
db.DemoAccount = demoAccount;
db.LiveAccount = liveAccount;
db.Withdraw = withdraw;
db.Popup = popup;
db.PriceHistory = priceHistory;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
