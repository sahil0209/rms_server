const Sequelize = require("sequelize");
const db = require("../util/db");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
  Status: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
});

module.exports = User;
