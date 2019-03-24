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
  waterTemp: Number,
  tds: Number,
  waterLevel: Number,
  mounted: {
    type: Boolean,
    default: false,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const System = mongoose.model("System", SystemSchema);

module.exports = System;
