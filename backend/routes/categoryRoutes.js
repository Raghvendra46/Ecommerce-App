const express = require("express");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");

const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  searchCategory,
} = require("../service/categoryService");

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, addCategory);

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

router.post("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

router.post("/get-category", getCategory);

router.post("/search-category/:slug", searchCategory);

router.post("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

module.exports = router;
