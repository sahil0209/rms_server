const Sequelize = require("sequelize");
const db = require("../util/db");

const AopMaster = db.define("aop_master", {
  aop_code: {
    type: Sequelize.STRING,
  },
  sub_aop_code: {
    type: Sequelize.STRING,
  },
  aop_owner: {
    type: Sequelize.STRING,
  },
  project_code: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  business_use: {
    type: Sequelize.STRING,
  },
  request_type: {
    type: Sequelize.STRING,
  },
  project_stage: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.BIGINT,
  },
  approved_flag: {
    type: Sequelize.INTEGER,
    Default: 0,
  },
});

module.exports = AopMaster;
