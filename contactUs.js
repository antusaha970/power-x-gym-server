const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  sendTime: {
    type: Date,
    default: new Date(),
  },
});

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

module.exports = ContactMessage;
