const express = require("express");
const ttdkController = require("../controllers/ttdk.controller");

const router = express.Router();

router.get("/getInfo/:email", ttdkController.getInfo);
router.get("/statistics/:regisCenter", ttdkController.getStatistics);
router.get("/uncensored/:regisCenter", ttdkController.unapprovedList);
router.get("/getByMonthYear/:regisCenter/:month/:year", ttdkController.getByMonthYear);
router.get("/getByQuarterYear/:regisCenter/:quarter/:year", ttdkController.getByQuarterYear);
router.get("/getByYear/:regisCenter/:year", ttdkController.getByYear);
router.get("/getExpiringCars/:regisCenter", ttdkController.getExpiringCars);
router.put("/approve/:licensePlate", ttdkController.approve);
module.exports = router;
