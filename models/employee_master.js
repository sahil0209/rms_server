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
  employee_secondary_skill: {
    type: Sequelize.STRING,
  },
  employee_department:{
    type:Sequelize.STRING
  },
  employee_sub_department:{
    type:Sequelize.STRING
  },
  employee_doj:{
    type:Sequelize.DATE
  },
  employee_reporting_manager:
  {
     type:Sequelize.STRING
  },
  employee_resigned_status:{
    type:Sequelize.BOOLEAN
  },
  dev_status:{
    type:Sequelize.STRING
  },
  gender:{
    type:Sequelize.STRING
  }

});

module.exports = employeeMaster;
