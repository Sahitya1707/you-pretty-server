import express from "express";
import { activateAdmin } from "../controllers/admin/admin_activation_controller";
import { adminSignin } from "../controllers/admin/admin_signin_controller";
import { adminSignup } from "../controllers/admin/admin_signup_controller";
import { authenticateAdmin } from "../middlewares/admin_auth";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/activate_admin", activateAdmin);
router.post("/signin", adminSignin);
router.post("/check_auth", authenticateAdmin, (req, res) => {
  return res.json({ login: true });
});

module.exports = router;
