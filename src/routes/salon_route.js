const express = require("express");
const path = require("path");
const multer = require("multer");
const Salon = require("../models/salon_schema");
const router = express.Router();
const authenticateUser = require("../middlewares/user_auth");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "salonImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
});

router.post("/add", upload.single("image"), authenticateUser, (req, res) => {
  const { salonName, serviceArray, locationId, landmarkId } = req.body;
  const newSalon = new Salon({
    salonName: salonName,
    location: locationId,
    landmark: landmarkId,
    service: serviceArray,
    vendorId: req.user._id,
    image: req.file.filename,
  });
  newSalon
    .save()
    .then((success) => {
      res.status(200).json({ message: "Salon has been saved" });
      console.log(success);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/get-salon", (req, res) => {
  Salon.find()
    .populate("location", "_id location")
    .populate("landmark", "_id landmark")
    // .find({})
    // .populate("service", "_id serviceName")
    .populate("service")
    // .exec((err, services) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    // })
    .then((salons) => {
      // console.log(salons.service);
      return res.status(200).json({ salons });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Salon.findByIdAndDelete(id)
    .then((salons) => {
      return res.status(200).json({ message: "Salon has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
