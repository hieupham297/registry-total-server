const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/getInfo/:email", userController.getInfo);

module.exports = router;
