const Sequelize = require("sequelize");
const db = require("../util/db");

const demandMaster = db.define("demand_master", {
  demand_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  project_id: {
    type: Sequelize.STRING,
  },
  employee_id: {
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
});

module.exports = demandMaster;
