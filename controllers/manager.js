const AOPMaster = require("../models/aop_master");
const RequestTable = require("../models/request_table");

exports.getUsers = (req, res, next) => {
  // console.log("Function Hit");
  AOPMaster.findAll()
    .then((users) => {
      // console.log(users[0].dataValues.name);
      res.status(200).json(users);
    })
    .catch((err) => console.log(err));
};

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
  const approved_flag = req.body.apprived_flag;

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
  })
    .then((result) => {
      req.body.skills
        .forEach((ele) => {
          RequestTable.create({
            project_code: project_code,
            band: ele.band,
            resource_type: ele.resource_type,
            skill: ele.skill,
            no_of_employee: ele.no_of_employee,
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

exports.showAllAOP = (req,res,next)=>{
    
}
