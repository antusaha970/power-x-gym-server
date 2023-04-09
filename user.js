const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    require: true,
  },
  mobileNumber: String,
  address: String,
  city: String,
  postal: String,
  zipCode: String,
  gender: String,
  plan: String,
  payment: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
