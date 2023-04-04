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

exports.declineAOPRequest = (req, res, next) => {
    const project_code = req.body.project_code;

    AOPMaster.update({
        approved_flag: 2
    },
        {
            where: { project_code: project_code },
        })
        .then((result) => {

            RequestTable.destroy({
                where: { project_code: project_code }
            })

                .then((result) => {
                    res.status(201).json({
                        message: "AOP request declined successfully!",
                    });
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.showAllAOP = (req, res, next) => {

}
