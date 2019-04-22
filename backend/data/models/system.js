const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SystemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  //   pumpSchedule: [
  //     {
  //       action: {
  //         type: String,
  //         required: true
  //       },
  //       time: {
  //         type: Date,
  //         required: true
  //       },
  //       value: Number
  //     }
  //   ],
  //   lightSchedule: [
  //     {
  //       action: {
  //         type: String,
  //         required: true
  //       },
  //       time: {
  //         type: Date,
  //         required: true
  //       },
  //       value: Number
  //     }
  //   ],
  sensors: [String],
  waterTemp: {
    type: Number,
    default: 0
  },
  tds: {
    type: Number,
    default: 0
  },
  waterLevel: {
    type: Boolean,
    default: false
  },
  pumpStatus: {
    type: Boolean,
    default: false
  },
  lightStatus: {
    type: Boolean,
    default: false
  },

  mounted: {
    type: Boolean,
    default: false,
    required: true
  },
  lastReading: Date,
  lastHarvest: Date,
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  produce: {
    type: [String],
    required: true
  },
  farm: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const System = mongoose.model("System", SystemSchema);

module.exports = System;
