const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const serviceName = mongoose.model("serviceName", serviceSchema);
module.exports = serviceName;
