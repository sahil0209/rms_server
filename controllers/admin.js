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
        message: "AOP status updated successfully!",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.rejectResource = (req, res, next) => {
  const id = req.body.demand_id;
  DemandMaster.destroy({ where: { id: id } }).then((result) => {
    res.status(200).json({
      message: "Resource allocation has been rejected",
      user: result,
    });
  });
};

exports.approveResource = (req, res, next) => {
  const id = req.body.demand_id;
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const fiscal_year = req.body.fiscal_year;
  const jan = req.body.jan;
  const feb = req.body.feb;
  const mar = req.body.mar;
  const apr = req.body.apr;
  const may = req.body.may;
  const jun = req.body.jun;
  const jul = req.body.jul;
  const aug = req.body.aug;
  const sep = req.body.sep;
  const oct = req.body.oct;
  const nov = req.body.nov;
  const dec = req.body.dec;
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
      res.status(201).json({
        message: "Resource allocated successfully",
        user: result,
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

exports.editAOPResourceRequest = (req, res, next) => {
  const id = req.body.id;
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const jan = req.body.jan;
  const feb = req.body.feb;
  const mar = req.body.mar;
  const apr = req.body.apr;
  const may = req.body.may;
  const jun = req.body.jun;
  const jul = req.body.jul;
  const aug = req.body.aug;
  const sep = req.body.sep;
  const oct = req.body.oct;
  const nov = req.body.nov;
  const dec = req.body.dec;
  const fiscal_year = req.body.fiscal_year;
  const band = req.body.band;
  const skill = req.body.skill;
  const resource_type = req.body.resource_type;
  DemandMaster.update(
    {
      project_id: project_id,
      employee_id: employee_id,
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
      fiscal_year: fiscal_year,
      band: band,
      skill: skill,
      resource_type: resource_type,
    },
    { where: { id: id } }
  )
    .then((result) => {
      res.status(201).json({
        message: "Demand request created successfully",
        user: result,
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
      having employee_id = 'E001'
    `
    )
    .then((data) => {
      res.status(200).json(data);
    })

    .catch((err) => console.log(err));
};
