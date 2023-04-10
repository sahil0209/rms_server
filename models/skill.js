const Sequelize = require("sequelize");
const db = require("../util/db");

const Skill = db.define("skill", {
  skill: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Skill;
