const express = require("express");
const router = express.Router();
router.get("/myname", (req, res) => {
  return res.status(200).json({
    name: "my name is sahitya neupane",
  });
});
module.exports = router;
