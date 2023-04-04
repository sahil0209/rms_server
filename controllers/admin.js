const AOPMaster = require("../models/aop_master");
const RequestTable = require("../models/request_table");
const DemandMaster = require("../models/demand_master")

exports.declineAOPRequest = (req, res, next) => {
  const project_code = req.body.project_code;

  AOPMaster.update(
    {
      approved_flag: 2,
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
  const approved_flag = req.body.approved_flag;
  const project_code = req.body.project_code;

  AOPMaster.update(
    {
      approved_flag: approved_flag,
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

exports.rejectResource = (req,res,next)=>{
  const id = req.body.demand_id;
  DemandMaster.delete(
    {where:{id:id}}
  ).then((res)=>{
    res.status(200).json({
      message: "Resource allocation has been rejected",
      user: result,
    });
  })
}

exports.approveResource = (req,res,next)=>{
  const id = req.body.demand_id;
  const project_id = req.body.project_id;
  const employee_id = req.body.employee_id;
  const fiscal_year = req.body.fiscal_year;
  
  const band = req.body.band;
  const skill = req.body.skill;
  const resource_type = req.body.resource_type;

   AllocationMaster.create({
        project_id: project_id,
        employee_id: employee_id,
        fiscal_year: fiscal_year,
        band: band,
        skill: skill,
        resource_type: resource_type,
    })
        .then((result) => {
            res.status(201).json({
                message: "Demand request created successfully",
                user: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

