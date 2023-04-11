const controllers = require("../controllers/users");
const express = require("express");
const router = express.Router();


router.post("/createUser", controllers.createUser);
router.post("/loginUser", controllers.loginUser);
// router.post("/signin", controllers.signIn);

module.exports = router;
