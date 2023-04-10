const Sequelize = require("sequelize");
const db = require("../util/db");

const Aop_code = db.define("aop_code", {
  aop_code: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Aop_code;
