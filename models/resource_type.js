const Sequelize = require("sequelize");
const db = require("../util/db");

const Resource_type = db.define("resource_type", {
  user_id: {
    type: Sequelize.STRING,
  },
  resource_type: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Resource_type;
