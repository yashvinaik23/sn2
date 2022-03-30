const mongoose = require("mongoose");
const validator = require("validator");

const results = mongoose.model("result", {
  status: { type: String },
  subject: {
    type: String,
    required: true,
  },
  marks: { type: Number, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = results;
