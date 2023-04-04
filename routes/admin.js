const controllers = require("../controllers/admin");
const express = require("express");
const router = express.Router();

router.get("/", controllers.getUsers);

router.post("/declineAOPRequest", controllers.declineAOPRequest);

module.exports = router;
