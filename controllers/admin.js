const AOPMaster = require("../models/aop_master");
const RequestTable = require("../models/request_table");
const DemandMaster = require("../models/demand_master");
const EmployeeMaster = require("../models/employee_master");
const AllocationMaster = require("../models/allocation_master");
// const sequelize = require("sequelize");
const sequelize = require("../util/db");

exports.declineAOPRequest = (req, res, next) => {
  const project_code = req.body.project_code;

  AOPMaster.update(
    {
      approved_flag: -1,
    },
    {
      where: { project_code: project_code },
    }
  )
    .then((result) => {
      RequestTable.destroy({
        where: { project_code: project_code },
      }).then((result) => {
        res.status(201).json({
          message: "AOP request declined successfully!",
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.acceptAOPRequest = (req, res, next) => {
  const project_code = req.body.project_code;

  AOPMaster.update(
    {
      approved_flag: 1,
    },
    {
      where: { project_code: project_code },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "AOP request accepted successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.rejectResource = (req, res, next) => {
  const id = req.body.demand_id;
  DemandMaster.update({ status: -1 }, { where: { id: id } }).then((result) => {
    res.status(200).json({
      message: "Resource allocation has been rejected",
      user: result,
    });
  });
};

exports.approveResource = (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const fiscal_year = req.body.fiscal_year;
  const jan = req.body.january;
  const feb = req.body.february;
  const mar = req.body.march;
  const apr = req.body.april;
  const may = req.body.may;
  const jun = req.body.june;
  const jul = req.body.july;
  const aug = req.body.august;
  const sep = req.body.september;
  const oct = req.body.october;
  const nov = req.body.november;
  const dec = req.body.december;
  const band = req.body.band;
  const skill = req.body.skill;
  const resource_type = req.body.resource_type;

  AllocationMaster.create({
    project_id: project_id,
    employee_id: employee_id,
    fiscal_year: fiscal_year,
    january: jan,
    february: feb,
    march: mar,
    april: apr,
    may: may,
    june: jun,
    july: jul,
    august: aug,
    september: sep,
    october: oct,
    november: nov,
    december: dec,
    band: band,
    skill: skill,
    resource_type: resource_type,
  })
    .then((result) => {
      DemandMaster.update({ status: 1 }, { where: { id: id } }).then((res1) => {
        res.status(201).json({
          message: "Resource allocated successfully",
          user: result,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createEmployee = (req, res, next) => {
  const employee_id = req.body.employee_id;
  const employee_name = req.body.employee_name;
  const employee_band = req.body.employee_band;
  const resource_type = req.body.resource_type;
  const employee_skill = req.body.employee_skill;

  EmployeeMaster.create({
    employee_id: employee_id,
    employee_name: employee_name,
    employee_band: employee_band,
    resource_type: resource_type,
    employee_skill: employee_skill,
  })
    .then((result) => {
      res.status(201).json({
        message: "Employee created successfully!",
        Employee: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.showAllDemand = (req, res, next) => {
  DemandMaster.findAll()

    .then((demands) => {
      res.status(200).json(demands);
    })

    .catch((err) => console.log(err));
};

exports.showAllApprove = (req, res, next) => {
  AllocationMaster.findAll()

    .then((data) => {
      res.status(200).json(data);
    })

    .catch((err) => console.log(err));
};

exports.checkBandwidth = (req, res, next) => {
  let employee_id = req.body.employee_id;
  AllocationMaster.findAll({ where: { employee_id: employee_id } }).then(
    (res1) => {
      // console.log("\\\\\\\\\\\\\\\\\\\\\\", res1);
      if (res1.length == 0) {
        res.status(200).json([
          [
            {
              january: 0,
              february: 0,
              march: 0,
              april: 0,
              may: 0,
              june: 0,
              july: 0,
              august: 0,
              september: 0,
              october: 0,
              november: 0,
              december: 0,
            },
          ],
        ]);
      } else {
        sequelize
          .query(
            `
      select 
      sum(january) as "january",
      sum(february) as "february", 
      sum(march) as "march", 
      sum(april) as "april", 
      sum(may) as "may", 
      sum(june) as "june", 
      sum(july) as "july", 
      sum(august) as "august",
      sum(september) as "september", 
      sum(october) as "october", 
      sum(november) as "november",
      sum(december) as "december"
      from allocation_masters 
      group by employee_id 
      having employee_id = '${employee_id}'
    `
          )
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => console.log(err));
      }
    }
  );
};

exports.showResourceByProjectId = (req, res, next) => {
  RequestTable.findAll({
    where: { project_code: req.body.project_code },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
};

exports.showDemandByProjectId = (req, res, next) => {
  DemandMaster.findAll({
    where: { project_id: req.body.project_id },
  })

    .then((demands) => {
      res.status(200).json(demands);
    })

    .catch((err) => console.log(err));
};

exports.showAllAOP = (req, res, next) => {
  AOPMaster.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => console.log(err));
};

exports.showDashboardStats = (req, res, next) => {
    sequelize
      .query(
        `select count(*) as "AllAOPCount" from aop_masters where approved_flag != -1`
      )
      .then((allAOPCount) => {
        sequelize
          .query(
            `select count(*) as "PendingAOPCount" from aop_masters where approved_flag = 0`
          )
          .then((pendingAOPCount) => {
            sequelize
              .query(
                `select count(*) as "PendingResourceCount" from demand_masters where status = '0'`
              )
              .then((pendingResourceCount) => {
                sequelize
                  .query(
                    `select count(*) as "HireResourceCount" from demand_masters where employee_id = null`
                  )
                  .then((hireResourceCount) => {
                    res.status(200).send({
                      allAOPCount: allAOPCount[0],
                      pendingAOPCount: pendingAOPCount[0],
                      pendingResourceCount: pendingResourceCount[0],
                      hireResourceCount: hireResourceCount[0],
                    });
                  });
              });
          });
      });
  };
