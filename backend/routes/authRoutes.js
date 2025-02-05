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
router.put("/profile", requireSignIn, updateProfile);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
