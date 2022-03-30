const mongoose = require("mongoose");

const holidays = mongoose.model("hoiday", {
  name: { type: String, required: true },
  description: {
    type: String,
  },
  date: { type: String, required: true, unique: true },
});

module.exports = holidays;
