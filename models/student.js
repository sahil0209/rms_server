const Sequelize = require("sequelize");
const db = require("../util/db");


const student = db.define("student", {
    // request_id: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    // },
    name: {
      type: Sequelize.STRING,
    },
    roll_no: {
      type: Sequelize.STRING,
    },
    class: {
        type: Sequelize.STRING
    }
  });
  
  module.exports = student;