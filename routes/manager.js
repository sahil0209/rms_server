const controllers = require("../controllers/manager");
const express = require("express");
const router = express.Router();

// router.get("/", controllers.getUsers);

router.post("/createAOPRequest", controllers.createAOPRequest);
router.post("/showManagerAOP", controllers.showManagerAOP);
router.post("/showOneAOP", controllers.showOneAOP);
router.post("/createAOPResourceRequest", controllers.createAOPResourceRequest);
router.post("/editAOPResourceRequest", controllers.editAOPResourceRequest);
router.post("/fetchAOPResourceRequest", controllers.fetchAOPResourceRequest);
router.post("/fillAOPResourceRequest", controllers.fillAOPResourceRequest);
router.post("/getEmployeeBandAndSkill", controllers.getEmployeeBandAndSkill);
// router.get("/getDemandWithEmployee", controllers.getDemandWithEmployee);
router.post(
  "/createAdditionalAOPResourceRequest",
  controllers.createAdditionalAOPResourceRequest
);
router.post("/deleteAOPResourceRequest", controllers.deleteAOPResourceRequest);
router.post(
  "/addEmployeeAgainstExisting",
  controllers.addEmployeeAgainstExisting
);

module.exports = router;
