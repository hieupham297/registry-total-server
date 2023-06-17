const userModel = require("../models/user.model");
const ttdkModel = require("../models/ttdk.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = crypto.randomBytes(32).toString("hex");

// Hàm đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }

    if (password === user.password) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token);

      if (res.status(201)) {
        return res.json({ status: "ok", data: user });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Đăng xuất thành công" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Đăng xuất thất bại" });
  }
};

const getInfo = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({ email });
    let userInfo = null;
    if (user.role === "ttdk") {
      userInfo = await ttdkModel.findOne({email})
    } else {
      userInfo = user;
    }
    res.send({ status: "Successful", data: userInfo });
  } catch (error) {
    console.log(error);
    res.send({ status: "Failed" });
  }
};

module.exports = { login, logout, getInfo };
