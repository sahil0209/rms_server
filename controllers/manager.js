const AOPMaster = require("../models/aop_master");
const RequestTable = require("../models/request_table");
const DemandMaster = require("../models/demand_master");
const AllocationMaster = require("../models/allocation_master");
const EmployeeMaster = require("../models/employee_master");

exports.createAOPRequest = (req, res, next) => {
  const aop_code = req.body.aop_code;
  const sub_aop_code = req.body.sub_aop_code;
  const aop_owner = req.body.aop_owner;
  const project_code = req.body.project_code;
  const business_use = req.body.business_use;
  const request_type = req.body.request_type;
  const project_stage = req.body.project_stage;
  const description = req.body.description;
  const budget = req.body.budget;
  const approved_flag = req.body.approved_flag;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
 
  AOPMaster.create({
    aop_code: aop_code,
    sub_aop_code: sub_aop_code,
    aop_owner: aop_owner,
    project_code: project_code,
    business_use: business_use,
    request_type: request_type,
    project_stage: project_stage,
    description: description,
    budget: budget,
    approved_flag: approved_flag,
    start_date : start_date,
    end_date : end_date
  })
    .then((result) => {
      req.body.skills
        .forEach((ele) => {
          RequestTable.create({
            project_code: project_code,
            band: ele.band,
            resource_type: ele.type,
            skill: ele.skill,
            no_of_employee: ele.numemp,
          });
        })
        .then((result) => {
          res.status(201).json({
            message: "AOP request created successfully!",
            user: result,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.showManagerAOP = (req, res, next) => {
  const aop_owner = req.body.aop_owner;

  AOPMaster.findAll({
    where: {
      aop_owner: aop_owner,
    },
  })
    .then((result) => {
      res.status(200).json({
        Project: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.showOneAOP = (req, res, next) => {
  const project_code = req.body.project_code;

  AOPMaster.findAll({
    where: {
      project_code: project_code,
    },
  })
    .then((result) => {
      RequestTable.findAll({
        where: {
          project_code: project_code,
        },
      }).then((requesttable) => {
        res.status(200).json({
          Request: requesttable,

          Aop: result,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.createAOPResourceRequest = (req, res, next) => {
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
  DemandMaster.create({
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
    resource_type: resource_type
  })
    .then((result) => {
      AOPMaster
      .update({approved_flag:2},{where:{project_code:project_id}})
      .then((res1)=>{
        res.status(201).json({
          message: "Demand request created successfully",
          user: res1,
        });
      })
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchAOPResourceRequest = (req, res, next) => {
  const project_id = req.body.project_id;
  DemandMaster.findAll({
    where: {
      project_id: project_id,
    },
  })
    .then((demands) => {
      res.status(200).json(demands);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fillAOPResourceRequest = (req, res, next) => {
  const project_code = req.body.project_code;

  RequestTable.findAll({
    where: {
      project_code: project_code,
    },
  })
    .then((result) => {
      res.send({
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEmployeeBandAndSkill = (req, res, next) => {
  
    const band = req.body.band;
    const skill = req.body.skill;

    EmployeeMaster.findAll({
        where : {
            employee_band : band,
            employee_skill : skill
         }
    }).then((result) => {
        res.send({
            emp : result
        })
    })
    .catch((err) =>{
        console.log(err);
    })

};
