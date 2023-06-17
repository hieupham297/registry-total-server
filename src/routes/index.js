const express = require("express");
const userRoute = require("./user.route");
const cdkRoute = require("./cdk.route");
const ttdkRoute = require("./ttdk.route");

const router = express.Router();

// Sử dụng userRoute cho đường dẫn /user
router.use("/user", userRoute);

// Sử dụng cdkRoute cho đường dẫn /cdk
router.use("/cdk", cdkRoute);

// Sử dụng ttdkRoute cho đường dẫn ttdk
router.use("/ttdk", ttdkRoute);

module.exports = router;
