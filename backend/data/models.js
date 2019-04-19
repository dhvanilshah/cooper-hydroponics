const System = require("./models/system");
const Temperature = require("./models/temperature");
const TDS = require("./models/tds");
const Harvest = require("./models/harvest");
const User = require("./models/user");
const Farm = require("./models/farm");

module.exports = {
  System: System,
  Temperature: Temperature,
  TDS: TDS,
  Harvest: Harvest,
  User: User,
  Farm: Farm
};
