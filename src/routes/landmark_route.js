const express = require("express");
const Landmark = require("../models/landmark_schema");
const router = express.Router();
router.post("/add-landmark", (req, res) => {
  const { landmark, location } = req.body;
  if (!landmark) {
    return res.status(200).json({ message: "Landmark should not be empty." });
  }
  const newLandmark = new Landmark({
    landmark,
    location,
  });
  newLandmark
    .save()
    .then((success) => {
      return res.status(200).json({ message: "Landmark has been saved" });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/get-landmark", (req, res) => {
  Landmark.find()
    .populate("location", "_id location")
    .then((landmarks) => {
      return res.status(200).json({ landmarks });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Landmark.findByIdAndDelete(id)
    .then((landmarks) => {
      return res.status(200).json({ message: "Landmark has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
