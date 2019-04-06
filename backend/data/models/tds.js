const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TDSSchema = new Schema({
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

const TDS = mongoose.model("TDS", TDSSchema);

module.exports = TDS;
