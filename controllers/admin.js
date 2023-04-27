const AOPMaster = require("../models/aop_master");
const RequestTable = require("../models/request_table");
const DemandMaster = require("../models/demand_master");
const EmployeeMaster = require("../models/employee_master");
const AllocationMaster = require("../models/allocation_master");
// const sequelize = require("sequelize");
const sequelize = require("../util/db");
const { where, Sequelize } = require("sequelize");
const e = require("express");

exports.declineAOPRequest = (req, res, next) => {
  const project_code = req.body.project_code;
  const reason = req.body.reason;

  AOPMaster.update(
    {
      approved_flag: -1,
      reason: reason,
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
  const reason = req.body.reason;

  AOPMaster.update(
    {
      approved_flag: 1,
      reason: reason,
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

function func(id) {
  DemandMaster.findAll({
    where: { id: id },
  }).then((result1) => {
    // console.log("result1", result1[0]);
    DemandMaster.findAll({
      where: {
        project_id: result1[0].project_id,
        status: "0",
      },
    }).then((result) => {
      // console.log(result[0]);
      if (result.length <= 1) {
        AOPMaster.update(
          {
            approved_flag: 2,
          },
          {
            where: {
              project_code: result1[0].project_id,
            },
          }
        ).then(() => {
          return "something";
        });
      }
    });
  });
}

exports.rejectResource = async (req, res, next) => {
  const id = req.body.demand_id;
  const reason_text = req.body.reason;
  await func(id);
  DemandMaster.update(
    { status: -1, reason: reason_text },
    { where: { id: id } }
  ).then((result) => {
    res.status(200).json({
      message: "Resource allocation has been rejected",
      user: result,
    });
  });
};

exports.approveResource = async (req, res, next) => {
  console.log(req.body);
  const id = req.body.data.id;
  const reason = req.body.reason;
  const project_id = req.body.data.project_id;
  const employee_id = req.body.data.employee_id;
  const fiscal_year = req.body.data.fiscal_year;
  const jan = req.body.data.january;
  const feb = req.body.data.february;
  const mar = req.body.data.march;
  const apr = req.body.data.april;
  const may = req.body.data.may;
  const jun = req.body.data.june;
  const jul = req.body.data.july;
  const aug = req.body.data.august;
  const sep = req.body.data.september;
  const oct = req.body.data.october;
  const nov = req.body.data.november;
  const dec = req.body.data.december;
  const band = req.body.data.band;
  const skill = req.body.data.skill;
  const resource_type = req.body.resource_type;
  await func(id);
  EmployeeMaster.findAll({
    where: { employee_id: employee_id }
  }).then((result1) => {
    AllocationMaster.create({
      project_id: project_id,
      employee_id: employee_id,
      employee_name: result1[0].employee_name,
      employee_reporting_manager: result1[0].employee_reporting_manager,
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
        DemandMaster.update(
          { status: 1, reason: reason },
          { where: { id: id } }
        ).then((res1) => {
          res.status(201).json({
            message: "Resource allocated successfully",
            user: result,
          });
        });
      })
      .catch((err) => {
        console.log(err);
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
    const employee_secondary_skill = req.body.employee_secondary_skill;
    const employee_department = req.body.employee_department;
    const employee_sub_department = req.body.employee_sub_department;
    const employee_doj = req.body.employee_doj;
    const employee_reporting_manager = req.body.employee_reporting_manager;
    const dev_status = req.body.dev_status;
    const employee_resigned_status = req.body.employee_resigned_status;
    const gender = req.body.gender;
    const status=req.body.status;
    const AOP_code=req.body.AOP_code;

    EmployeeMaster.create({

        employee_id:employee_id,
        employee_name: employee_name,
        employee_band: employee_band,
        resource_type: resource_type,
        employee_skill: employee_skill,
        employee_secondary_skill: employee_secondary_skill,
        employee_department: employee_department,
        employee_sub_department: employee_sub_department,
        employee_doj: employee_doj,
        employee_reporting_manager:employee_reporting_manager,
        dev_status: dev_status,
        employee_resigned_status: employee_resigned_status,
        gender: gender,
        status:status,
        AOP_code:AOP_code
    })
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Employee created successfully!",
                Employee: result,
            });
        })
        .catch((err) => {
            res.json({
                success: false,
                message: "Employee already exist",
                error: err,
            });
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

exports.allocationView = (req, res, next) => {
  // let employee_id = req.body.employee_id;
  let resultArr = new Array();
  EmployeeMaster.findAll().then((result) => {
    result.forEach((r, i) => {
      console.log(r.employee_id);
      AllocationMaster.findAll({ where: { employee_id: r.employee_id } }).then(
        (res1) => {
          if (res1.length == 0) {
            resultArr.push([
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
                  having employee_id = '${r.employee_id}'
                `
              )
              .then((data) => {
                // res.status(200).json(data);
                resultArr.push(data[0]);
                //console.log(resultArr);
                //return data[0];
                console.log("ResultArr : ", resultArr);
                //res.status(200).send({ res: resultArr });
              })
              .catch((err) => console.log(err));
            // console.log("Result : ", resultArr);
          }
          // console.log("/////////////////", result.length);
          if (i == result.length - 1) {
            console.log("Inside IF", resultArr);
            res.status(200).send({ res: resultArr });
          }
        }
      );
    });
    //res.status(200).send({ data: resultArr });
  });
};

exports.deleteAOPResource = (req, res, next) => {
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const band = req.body.band;
  const resource_type = req.body.resource_type;
  const skill = req.body.skill;
  DemandMaster.destroy({
    where: { project_id: project_id, employee_id: employee_id },
  })
    .then((data) => {
      AllocationMaster.destroy({
        where: { project_id: project_id, employee_id: employee_id },
      })
        .then((result) => {
          RequestTable.findAll({
            where: {
              band: band,
              resource_type: resource_type,
              skill: skill,
            },
          })
            .then((data) => {
              RequestTable.update(
                {
                  no_of_employee: Sequelize.literal("no_of_employee - 1"),
                },
                {
                  where: {
                    project_code: project_id,
                    band: band,
                    resource_type: resource_type,
                    skill: skill,
                  },
                }
              ).then((data) => {
                res.status(201).json({
                  message: "Demand request deleted successfully",
                });
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.rejectDeleteAOPResourceRequest = (req, res, next) => {
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  DemandMaster.update(
    {
      status: 1,
    },
    {
      where: { project_id: project_id, employee_id: employee_id },
    }
  )
    .then((data) => {
      res.res.status(201).json({
        message: "deletion request rejected successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
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


exports.showAllDataOFEmployee = (req, res, next) => {
  sequelize
    .query(
      `Select "a_m"."aop_code" ,"a_m"."sub_aop_code","a_m"."aop_owner","all_master"."project_id","a_m"."business_use","a_m"."request_type",
    "emp_master"."employee_id","emp_master"."employee_name","emp_master"."employee_band","emp_master"."employee_skill","emp_master"."employee_reporting_manager",
    "emp_master"."employee_department",
     "emp_master"."employee_sub_department","emp_master"."employee_doj","emp_master"."employee_resigned_status","emp_master"."dev_status","emp_master"."gender"
    From "aop_masters" as "a_m",
    "employee_masters"as "emp_master",
    "allocation_masters" as "all_master"
    Where "a_m"."project_code"="all_master"."project_id" and "all_master"."employee_id"="emp_master"."employee_id";
    
    `
    )
    .then((employee) => {
      res.status(200).json(employee);
    })

    .catch((err) => console.log(err));
};

exports.showEmployeeDetail = (req, res, next) => {
  EmployeeMaster.findAll()

    .then((employee) => {
      res.status(200).json(employee);
    })

    .catch((err) => console.log(err));
};

exports.showEmpId = (req, res, next) => {
  EmployeeMaster.findAll({
    attributes: ["employee_id"],
  })
    .then((employee) => {
      res.status(200).json(employee);
    })

    .catch((rr) => console.log(err));
};

exports.editEmployeeRequest = (req, res, next) => {
  // const emp_id=req.body.employee_id;

  const emp_name = req.body.employee_name;
  const emp_band = req.body.employee_band;
  const resource_type = req.body.resource_type;
  const emp_skill = req.body.employee_skill;
  const emp_sec_skill = req.body.employee_secondary_skill;

  EmployeeMaster.update(
    {
      employee_name: emp_name,
      employee_band: emp_band,
      resource_type: resource_type,
      employee_skill: emp_skill,
      employee_secondary_skill: emp_sec_skill,
    },
    {
      where: {
        employee_id: req.body.employee_id,
      },
    }
  )
    .then((employee) => {
      res.status(200).json({
        success: true,
        message: "Employee Updated Successfully",
      });
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
                    pendingResourceCount:
                      pendingResourceCount[0],
                    hireResourceCount: hireResourceCount[0],
                  });
                });
            });
        });
    });
};

exports.destroyEmployee = (req, res, next) => {
  EmployeeMaster.destroy({
    where: {
      employee_id: req.body.employee_id,
    },
  })
    .then((employee) => {
      res.status(200).json({
        success: true,
        message: "Employee Deleted Successfully",
      });
    })
    .catch((err) => console.log(err));
};
exports.distinctEmployeeIds = (req, res, next) => {
  sequelize
    .query(
      `SELECT *
        FROM demand_masters
        WHERE "demand_masters"."updatedAt" IN
             (SELECT max("demand_masters"."updatedAt" )
              FROM demand_masters
              GROUP BY employee_id)`
    )
    .then((employee) => {
      res.status(200).json({ employee: employee });
    })
    .catch((err) => {
      res.json({ err: err });
    });
};

exports.getAllocationMastersEmployees = (req, res, next) => {
  sequelize.query(`select employee_id,
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
  group by employee_id`)
    .then((result) => {
      res.status(200).json(result[0]);
    }).catch((err) => {
      console.log(err);
      res.json({ err: err });
    });
};

exports.auditTrailbyEmployeeId = (req, res, next) => {
  const emp_id = req.body.employee_id;
  DemandMaster.findAll({
      where: {
        employee_id: emp_id,
      },
      order: [["updatedAt", "DESC"]],
    })
    .then((employee) => {
      res.status(200).json({ employee: employee });
      console.log(employee);
    })
    .catch((err) => {
      res.json({ err: err });
    });
};
