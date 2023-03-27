const controllers = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.get("/", controllers.getUsers);

router.post("/", controllers.createUser);

module.exports = router;
