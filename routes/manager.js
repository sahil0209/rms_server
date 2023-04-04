const controllers = require("../controllers/manager");
const express = require("express");
const router = express.Router();

router.get("/", controllers.getUsers);

router.post("/createAOPRequest", controllers.createAOPRequest);

module.exports = router;
