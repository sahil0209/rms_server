const Sequelize = require("sequelize");
const db = require("../util/db");

const requestTable = db.define("request_table", {
  request_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  project_code: {
    type: Sequelize.STRING,
  },
  band: {
    type: Sequelize.STRING,
  },
  resource_type: {
    type: Sequelize.STRING,
  },
  skill: {
    type: Sequelize.STRING,
  },
  no_of_employee: {
    type: Sequelize.INTEGER,
  },
  approved_request: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
});

module.exports = requestTable;
