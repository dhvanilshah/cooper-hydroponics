const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FarmSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  _systems: [Schema.Types.ObjectId],
  _creatorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _members: [Schema.Types.ObjectId],
  _admins: [Schema.Types.ObjectId],
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Farm = mongoose.model("Farm", FarmSchema);

module.exports = Farm;
