const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TemperatureSchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  _systemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Temperature = mongoose.model("Temperature", TemperatureSchema);

module.exports = Temperature;
