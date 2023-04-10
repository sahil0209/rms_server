const controllers = require("../controllers/users");
const express = require("express");
const router = express.Router();


router.post("/createUser", controllers.createUser);
router.post("/loginUser", controllers.loginUser);

module.exports = router;
