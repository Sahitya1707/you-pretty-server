const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("location", locationSchema);

module.exports = Location;
