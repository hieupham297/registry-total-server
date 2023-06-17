const mongoose = require("mongoose");

const organSchema = new mongoose.Schema({
  unitName: {
    type: String,
    required: true,
  },
  unitCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  represent: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
});

const organModel = mongoose.model("Organ", organSchema);

module.exports = organModel;
