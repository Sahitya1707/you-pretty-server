const mongoose = require("mongoose");
const landmarkSchema = new mongoose.Schema(
  {
    landmark: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
  },
  { timestamps: true }
);
const Landmark = mongoose.model("landmark", landmarkSchema);
module.exports = Landmark;
