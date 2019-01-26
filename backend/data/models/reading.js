const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReadingSchema = new Schema({
  sensor: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
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

const Reading = mongoose.model("Reading", ReadingSchema);

module.exports = Reading;
