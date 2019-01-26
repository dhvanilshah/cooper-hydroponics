const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HarvestSchema = new Schema({
  unit: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  amountUseful: {
    type: Number,
    required: false
  },
  _systemId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateHarvested: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Harvest = mongoose.model("Harvest", HarvestSchema);

module.exports = Harvest;
