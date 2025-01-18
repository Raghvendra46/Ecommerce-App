const express = require("express");
const {
  signUp,
  login,
  testApi,
  forgotPassword,
  updateProfile,
} = require("../service/authService");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.get("/test", requireSignIn, isAdmin, testApi);

router.post("/forgot-password", forgotPassword);
router.post("/update-profile", updateProfile);

module.exports = router;
