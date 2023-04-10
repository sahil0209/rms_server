const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res, next) => {
  const email = req.body.email;
  const role = req.body.role;
  const hashPass = await bcrypt.hash(req.body.password, saltRounds);
  User.create({
    email: email,
    password: hashPass,
    role: role,
  })
    .then((result) => {
      res.status(201).json({
        message: "User created successfully!",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  User.findAll({
    where: {
      email: email,
    },
  })
    .then(async (result) => {
    //   console.log("Result Acquired is", result[0]);
      let isCorrected = await bcrypt.compare(
        req.body.password,
        result[0].password
      );
      if (isCorrected) {
        res.status(200).json({
          message: "Success",
            user: result,
        });
      } else {
        res.status(200).json({
          message: "Wrong",
        });
      }
    })
    .catch((err) => {
      res.status(200).json({
        message: "failure",
        err: err,
      });
    });
};
