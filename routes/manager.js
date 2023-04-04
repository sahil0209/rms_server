const controllers = require("../controllers/manager");
const express = require("express");
const router = express.Router();

// router.get("/", controllers.getUsers);

router.post("/createAOPRequest", controllers.createAOPRequest);
router.get("/showAllAOP", controllers.showAllAOP);
router.post("/showManagerAOP", controllers.showManagerAOP);
router.post("/showOneAOP", controllers.showOneAOP);
router.post("/createAOPResourceRequest", controllers.createAOPResourceRequest);
router.post("/fetchAOPResourceRequest", controllers.fetchAOPResourceRequest);
router.post("/fillAOPResourceRequest", controllers.fillAOPResourceRequest);
router.post("/getEmployeeBandAndSkill", controllers.getEmployeeBandAndSkill);

module.exports = router;
