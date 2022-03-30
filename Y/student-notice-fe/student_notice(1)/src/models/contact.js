const mongoose = require("mongoose");

const contacts = mongoose.model("contact", {
  name: { type: String, required: true },
  description: {
    type: String,
  },
  email: { type: String, unique: true, required: true },
  number: { type: Number, required: true },
});

module.exports = contacts;
