const express = require("express");
const Location = require("../models/location_schema");
const router = express.Router();

router.post("/add", (req, res) => {
  // console.log("route has been reached");
  const { location } = req.body;
  if (!location) {
    console.log(req.body);
    return res.status(200).json({ message: "Location should not be empty." });
  }
  const newLocation = new Location({
    location,
  });
  newLocation
    .save()
    .then((succes) => {
      return res.status(200).json({ message: "Location has been saved" });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/get-location", (req, res) => {
  Location.find()
    .then((locations) => {
      return res.status(200).json({ locations });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Location.findByIdAndDelete(id)
    .then((locations) => {
      return res.status(200).json({ message: "Location has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
