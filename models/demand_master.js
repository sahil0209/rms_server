const Sequelize = require("sequelize");
const db = require("../util/db");

const demandMaster = db.define("demand_master", {
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
    defaultValue: 100,
  },
  february: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  march: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  april: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  may: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  june: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  july: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  august: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  september: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  october: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  november: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  december: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },

  fiscal_year: {
    type: Sequelize.INTEGER,
  },
  band: {
    type: Sequelize.STRING,
  },
  skill: {
    type: Sequelize.STRING,
  },
  resource_type: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  reason:{
    type: Sequelize.STRING,
  }
});

module.exports = demandMaster;
