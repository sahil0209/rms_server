const User = require("../models/user");

exports.getUsers = (req, res, next) => {
    // console.log("Function Hit");
    User.findAll()
        .then((users) => {
            // console.log(users[0].dataValues.name);
            res.status(200).json(users);
        })
        .catch((err) => console.log(err));
};

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name: name,
        email: email,
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
