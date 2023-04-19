const Sequelize = require("sequelize");
const db = require("../util/db");
const DemandMaster = require("../models/demand_master");

const employeeMaster = db.define("employee_master", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  employee_id: {
    type: Sequelize.STRING,
    primaryKey: true,
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
  employee_secondary_skill: {
    type: Sequelize.STRING,
  },
});

// employeeMaster.hasMany(DemandMaster);

module.exports = employeeMaster;
