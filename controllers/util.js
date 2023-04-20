const Aop_code = require("../models/aop_code");
const Band = require("../models/band");
const Resource_type = require("../models/resource_type");
const Skill = require("../models/skill");
const nodemailer = require("nodemailer");

exports.getSkills = (req, res, next) => {
  Skill.findAll()
    .then((skill) => {
      res.status(200).json(skill);
    })
    .catch((err) => console.log(err));
};

exports.getResource_type = (req, res, next) => {
  Resource_type.findAll()
    .then((resource_type) => {
      res.status(200).json(resource_type);
    })
    .catch((err) => console.log(err));
};

exports.getBand = (req, res, next) => {
  Band.findAll()
    .then((band) => {
      res.status(200).json(band);
    })
    .catch((err) => console.log(err));
};

exports.getAop_code = (req, res, next) => {
  Aop_code.findAll()
    .then((aop_code) => {
      res.status(200).json(aop_code);
    })
    .catch((err) => console.log(err));
};

exports.addBand = (req, res, next) => {
  const band = req.body.band;
  const user_id = req.body.user_id;
  Band.create({
    user_id: user_id,
    band: band,
  })
    .then((result) => {
      res.status(200).json({
        message: "band added",
        band: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.addResourceType = (req, res, next) => {
  const resource_type = req.body.resource_type;
  const user_id = req.body.user_id;

  Resource_type.create({
    user_id: user_id,
    resource_type: resource_type,
  })
    .then((result) => {
      res.status(200).json({
        message: "resource_type added",
        resource_type: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.addSkill = (req, res, next) => {
  const skill = req.body.skill;
  const user_id = req.body.user_id;


  Skill.create({
    user_id: user_id,
    skill: skill,
  })
    .then((result) => {
      res.status(200).json({
        message: "Skills added",
        skill: result,
      });
    })
    .catch((err) => console.log(err));
};
