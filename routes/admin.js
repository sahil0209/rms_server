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
router.get("/showAllDemand", controllers.showAllDemand);
router.get("/showAllApprove", controllers.showAllApprove);

module.exports = router;