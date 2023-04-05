const mongoose = require("mongoose");
const salonSchema = new mongoose.Schema({
  salonName: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
  },
  landmark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "landmark",
  },
  service: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceName",
    },
  ],
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  image: {
    type: String,
    required: true,
    default: "abcd",
  },
});
const SalonName = mongoose.model("salon", salonSchema);
module.exports = SalonName;
