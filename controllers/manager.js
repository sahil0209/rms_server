const AOPMaster = require("../models/aop_master");
const RequestTable = require("../models/request_table");
const DemandMaster = require("../models/demand_master");
const AllocationMaster = require("../models/allocation_master");
const EmployeeMaster = require("../models/employee_master");
const Sequelize = require("sequelize");

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
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  console.log(req.body.skills);
  //   const approved_flag = req.body.approved_flag;

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
    start_date: start_date,
    end_date: end_date,
    approved_flag: 0,
  })
    .then((result) => {
      req.body.skills.forEach((ele) => {
        RequestTable.create({
          project_code: project_code,
          band: ele.band,
          resource_type: ele.resource_type,
          skill: ele.skill,
          no_of_employee: ele.no_of_employee,
        })
          .then((result) => {
            res.status(201).json({
              message: "AOP request created successfully!",
              user: result,
            });
          })
          .catch((err) => {
            console.log(err);
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
  console.log("called", req.body);
  console.log("called1");
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const jan = req.body.jan || 0;
  const feb = req.body.feb || 0;
  const mar = req.body.mar || 0;
  const apr = req.body.apr || 0;
  const may = req.body.may || 0;
  const jun = req.body.jun || 0;
  const jul = req.body.jul || 0;
  const aug = req.body.aug || 0;
  const sep = req.body.sep || 0;
  const oct = req.body.oct || 0;
  const nov = req.body.nov || 0;
  const dec = req.body.dec || 0;
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
        .update({ approved_flag: 2 }, { where: { project_code: project_id } })
        .then((res1) => {
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
  const employee_secondary_skill = req.body.employee_secondary_skill;

  EmployeeMaster.findAll({
    where: {
      employee_band: band,
      employee_skill: skill,
      // employee_secondary_skill: employee_secondary_skill,
    },
  })
    .then((result) => {
      res.send({
        emp: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editAOPResourceRequest = (req, res, next) => {
  const id = req.body.id;
  const jan = req.body.january || 0;
  const feb = req.body.february || 0;
  const mar = req.body.march || 0;
  const apr = req.body.april || 0;
  const may = req.body.may || 0;
  const jun = req.body.june || 0;
  const jul = req.body.july || 0;
  const aug = req.body.august || 0;
  const sep = req.body.september || 0;
  const oct = req.body.october || 0;
  const nov = req.body.november || 0;
  const dec = req.body.december || 0;
  DemandMaster.update(
    {
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
      december: dec
    },
    { where: { id: id } }
  )
    .then((result) => {
      res.status(201).json({
        message: "Demand request updated successfully",

      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createAdditionalAOPResourceRequest = (req, res, next) => {
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const jan = req.body.jan || 0;
  const feb = req.body.feb || 0;
  const mar = req.body.mar || 0;
  const apr = req.body.apr || 0;
  const may = req.body.may || 0;
  const jun = req.body.jun || 0;
  const jul = req.body.jul || 0;
  const aug = req.body.aug || 0;
  const sep = req.body.sep || 0;
  const oct = req.body.oct || 0;
  const nov = req.body.nov || 0;
  const dec = req.body.dec || 0;
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
        .update({ approved_flag: 2 }, { where: { project_code: project_id } })
        .then((res1) => {
          res.status(201).json({
            message: "Demand request created successfully",
          });
        });

      RequestTable.findAll({
        where: {
          band: band,
          resource_type: resource_type,
          skill: skill
        }
      }).then((data) => {
        if (data.length === 0) {
          RequestTable.create(
            {
              project_code: project_id,
              band: band,
              resource_type: resource_type,
              skill: skill,
              no_of_employee: 1
            }
          )
        }
        else {
          RequestTable.update({
            no_of_employee: Sequelize.literal('no_of_employee + 1')
          }, {
            where: {
              project_code: project_id,
              band: band,
              resource_type: resource_type,
              skill: skill,
            }
          })
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.deleteAOPResource = (req, res, next) => {
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const band = req.body.band;
  const resource_type = req.body.resource_type;
  const skill = req.body.skill;
  DemandMaster.destroy({
    where: { project_id: project_id, employee_id: employee_id }
  }).then((data) => {
    AllocationMaster.destroy({
      where: { project_id: project_id, employee_id: employee_id }
    }).then((result) => {
      RequestTable.findAll({
        where: {
          band: band,
          resource_type: resource_type,
          skill: skill
        }
      }).then((data) => {
        RequestTable.update({
          no_of_employee: Sequelize.literal('no_of_employee - 1')
        }, {
          where: {
            project_code: project_id,
            band: band,
            resource_type: resource_type,
            skill: skill,
          }
        }).then((data) => {
          res.status(201).json({
            message: "Demand request deleted successfully",
          });
        })
      }).catch((err) => {
        console.log(err);
      })
    })
      .catch((err) => {
        console.log(err);
      });

  }).catch((err) => {
    console.log(err);
  })
};