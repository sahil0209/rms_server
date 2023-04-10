const Sequelize = require("sequelize");
const db = require("../util/db");

const Band = db.define("band", {
  band: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Band;
