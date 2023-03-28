const Sequelize = require('sequelize');
const db = require('../util/db');

const AopMaster = db.define('aop_master', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    sub_aop_code: {
        type: Sequelize.STRING
    },
    aop_owner: {
        type: Sequelize.STRING,
    },
    project_code: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    business_use: {
        type: Sequelize.STRING
    },
    request_type: {
        type: Sequelize.STRING
    },
    project_stage: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.BIGINT
    },
    approvedFlag: {
        type: Sequelize.BOOLEAN,
        Default : false
    }
});



module.exports = AopMaster;