const Student = require("../models/student");
const EmployeeMaster  = require("../models/employee_master");
const sequelize = require("../util/db");

// exports.createStudent = (req, res, next) => {

//     nam = req.body.name;
//     classing = req.body.class;
//     roll_no = req.body.roll_no



//     Student.create({
//         name: nam,
//         class: classing,
//         roll_no: roll_no
//     })
//         .then((result) => {
//             console.log({
//                 success: true,
//                 message: "Hi"
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

exports.createEmployee = (req,res,next) => {
    employee_id = req.body.employee_id;
    employee_name = req.body.employee_name;
    employee_band = req.body.employee_band;
    employee_skill = req.body.employee_skill;
    resource_type = req.body.resource_type;

    EmployeeMaster.create({
        employee_id : employee_id,
        employee_name : employee_name,
        employee_band : employee_band,
        employee_skill : employee_skill,
        resource_type : resource_type
    })
        .then((result) => {
            res.status(201).json({
                message: "Employee created successfully!",
                user: result,
              });
        })
        .catch((err) => {
            console.log(err);
        });
}
