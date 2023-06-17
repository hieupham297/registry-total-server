const mongoose = require("mongoose");

const ttdkSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  represent: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const ttdkModel = mongoose.model("Ttdk", ttdkSchema);

module.exports = ttdkModel;
