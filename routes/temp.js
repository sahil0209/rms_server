const controllers = require("../controllers/temp");
const express = require("express");
const router = express.Router();


// router.post("/insert", controllers.createStudent);
router.post("/insertEmployee", controllers.createEmployee);


module.exports = router;