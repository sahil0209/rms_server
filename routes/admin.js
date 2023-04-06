const controllers = require("../controllers/admin");
const express = require("express");
const router = express.Router();

// router.get("/", controllers.getUsers);

router.post("/declineAOPRequest", controllers.declineAOPRequest);
router.put("/acceptAOPRequest", controllers.acceptAOPRequest);
router.post("/rejectResource", controllers.rejectResource);
router.post("/approveResource", controllers.approveResource);
router.post("/createEmployee", controllers.createEmployee);
router.post("/editAOPResourceRequest", controllers.editAOPResourceRequest);
router.post("/showResourceByProjectId", controllers.showResourceByProjectId);
router.post("/showDemandByProjectId", controllers.showDemandByProjectId);
router.get("/showAllDemand", controllers.showAllDemand);
router.get("/showAllApprove", controllers.showAllApprove);
router.post("/checkBandwidth", controllers.checkBandwidth);
router.get("/showAllAOP", controllers.showAllAOP);

module.exports = router;
