const controllers = require("../controllers/admin");
const express = require("express");
const router = express.Router();

// router.get("/", controllers.getUsers);

router.post("/declineAOPRequest", controllers.declineAOPRequest);
router.put("/acceptAOPRequest", controllers.acceptAOPRequest);
router.post("/rejectResource", controllers.rejectResource);
router.post("/approveResource", controllers.approveResource);
router.post("/createEmployee", controllers.createEmployee);
router.post("/showResourceByProjectId", controllers.showResourceByProjectId);
router.post("/showDemandByProjectId", controllers.showDemandByProjectId);
router.get("/showAllDemand", controllers.showAllDemand);
router.get("/showAllApprove", controllers.showAllApprove);
router.post("/checkBandwidth", controllers.checkBandwidth);
router.get("/showDashboardStats", controllers.showDashboardStats);
router.get("/showAllAOP", controllers.showAllAOP);
router.get("/showAllEmployee", controllers.showAllEmployee);
router.put("/updateEmployeeRecord", controllers.editEmployeeRequest);
router.get("/allocationView", controllers.allocationView);
router.post("/deleteAOPResource", controllers.deleteAOPResource);
router.post("/rejectDeleteAOPResource", controllers.rejectDeleteAOPResource);
router.get("/showAllData",controllers.showAllDataOFEmployee);
router.get("/showEmpId",controllers.showEmpId);
router.get("/showDashboardStats", controllers.showDashboardStats);
router.post("/destroyemployee",controllers.destroyEmployee);
router.get("/showemployeeData",controllers.showEmployeeDetail);
router.get("/getAllocationMastersEmployees",controllers.getAllocationMastersEmployees);

//Audit Trail
router.get("/distinctEmployeeIds", controllers.distinctEmployeeIds)
router.post("/auditTrailbyEmployeeId", controllers.auditTrailbyEmployeeId)
module.exports = router;
