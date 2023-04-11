const controllers = require("../controllers/util");
const express = require("express");
const router = express.Router();

router.get("/getSkills", controllers.getSkills);
router.get("/getResource_type", controllers.getResource_type);
router.get("/getBand", controllers.getBand);
router.get("/getAop_code", controllers.getAop_code);
router.post("/addSkills", controllers.addSkill);
router.post("/addBands", controllers.addBand);
router.post("/addResourceType", controllers.addResourceType);


module.exports = router;
