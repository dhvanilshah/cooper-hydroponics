const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TDSSchema = new Schema({
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

const TDS = mongoose.model("TDS", TDSSchema);

module.exports = TDS;
