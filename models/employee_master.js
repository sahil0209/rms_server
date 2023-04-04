const Sequelize = require("sequelize");
const db = require("../util/db");

const employeeMaster = db.define("employee_master", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  employee_id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  employee_name: {
    type: Sequelize.STRING,
  },
  employee_band: {
    type: Sequelize.STRING,
  },
  resource_type: {
    type: Sequelize.STRING,
  },
  employee_skill: {
    type: Sequelize.STRING,
  },
});

module.exports = employeeMaster;
