const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  _farms: [Schema.Types.ObjectId]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
