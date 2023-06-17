const express = require("express");
const cdkController = require("../controllers/cdk.controller");

const router = express.Router();

router.post("/createAcc", cdkController.createAcc);
router.put("/updateCenter/:email", cdkController.updateCenter);
router.delete("/deleteAcc/:email", cdkController.deleteAcc);
router.get("/getAllCenter", cdkController.getAllCenter);
// Lọc theo khu vực
router.get("/getAllCar", cdkController.getAllCar);
router.get("/getCarByRegion/:region", cdkController.getCarByRegion);
router.get("/getCarByCenter/:code", cdkController.getCarByCenter);
// Lọc theo ngày tháng năm
router.get("/getCarByMonthYear/:month/:year", cdkController.getCarByMonthYear);
router.get(
  "/getCarByQuarterYear/:quarter/:year",
  cdkController.getCarByQuarterYear
);
router.get("/getCarByYear/:year", cdkController.getCarByYear);
// lấy các xe hết hạn
router.get("/getExpiringCars", cdkController.getExpiringCars);
router.get(
  "/getExpiringCarsByRegion/:region",
  cdkController.getExpiringCarsByRegion
);

module.exports = router;
