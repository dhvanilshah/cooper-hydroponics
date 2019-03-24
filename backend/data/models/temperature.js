const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TemperatureSchema = new Schema({
  system: {
    type: Schema.Types.ObjectId,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  dateEntered: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Temperature = mongoose.model("Temperature", TemperatureSchema);

module.exports = Temperature;
