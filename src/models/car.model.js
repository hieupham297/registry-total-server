const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
  modelCode: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  engineNumber: {
    type: String,
    required: true,
  },
  chassisNumber: {
    type: String,
    required: true,
  },
  seat: {
    type: Number,
    required: true,
  },
  regisDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  GCN: {
    type: String,
    required: true,
  },
  regisCenter: {
    type: String,
    required: true,
  },
  isCensored: {
    type: Boolean,
    required: true,
  },
});

const carModel = mongoose.model("Car", carSchema);

module.exports = carModel;
