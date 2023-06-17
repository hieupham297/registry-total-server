const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  CMND: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
});

const personModel = mongoose.model("Personal", personSchema);

module.exports = personModel;
