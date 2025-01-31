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

router.post("/create-category", /*requireSignIn, isAdmin,*/ addCategory);

router.put("/update-category/:id", /*requireSignIn, isAdmin,*/ updateCategory);

router.delete(
  "/delete-category/:id",
  /*requireSignIn, isAdmin,*/ deleteCategory
);

router.get("/get-category", getCategory);

router.get("/search-category/:slug", searchCategory);

module.exports = router;
