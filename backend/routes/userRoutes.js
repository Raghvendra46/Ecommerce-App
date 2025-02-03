const express = require("express");
const userModel = require("../model/userModel");
const {
  addUser,
  searchUser,
  deleteUser,
  updateUser,
} = require("../service/userService");
const { requireSignIn } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addUser", /*requireSignIn,*/ addUser);

router.get("/searchUser", /*requireSignIn,*/ searchUser);

router.delete("/deleteUser/:id", /*requireSignIn,*/ deleteUser);

router.put("/updateUser/:id", /*requireSignIn,*/ updateUser);

module.exports = router;
