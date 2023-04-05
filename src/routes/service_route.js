const express = require("express");
const Service = require("../models/service_schema");
const router = express.Router();
router.post("/add", (req, res) => {
  const { service } = req.body;
  if (!service) {
    console.log(req.body);
    return res.status(200).json({ message: "Location should not be empty." });
  }
  const newService = new Service({
    // bridal: "true",
    serviceName: service,
  });
  newService
    .save()
    .then((success) => {
      return res.status(200).json({ message: "Services has been saved" });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/get-service", (req, res) => {
  Service.find()
    .then((services) => {
      return res.status(200).json({ services });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Service.findByIdAndDelete(id)
    .then((services) => {
      return res.status(200).json({ message: "Service has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
