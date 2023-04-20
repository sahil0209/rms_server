const Sequelize = require("sequelize");
const db = require("../util/db");

const allocationMaster = db.define("allocation_master", {

  project_id: {
    type: Sequelize.STRING,
  },
  employee_id: {
    type: Sequelize.STRING,
  },
  employee_name:{
    type: Sequelize.STRING,
  },
  employee_reporting_manager:{
    type: Sequelize.STRING,
  },
  january: {
    type: Sequelize.INTEGER,
  },
  february: {
    type: Sequelize.INTEGER,
  },
  march: {
    type: Sequelize.INTEGER,
  },
  april: {
    type: Sequelize.INTEGER,
  },
  may: {
    type: Sequelize.INTEGER,
  },
  june: {
    type: Sequelize.INTEGER,
  },
  july: {
    type: Sequelize.INTEGER,
  },
  august: {
    type: Sequelize.INTEGER,
  },
  september: {
    type: Sequelize.INTEGER,
  },
  october: {
    type: Sequelize.INTEGER,
  },
  november: {
    type: Sequelize.INTEGER,
  },
  december: {
    type: Sequelize.INTEGER,
  },
});

module.exports = allocationMaster;
