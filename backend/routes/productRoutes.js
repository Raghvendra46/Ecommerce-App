const express = require("express");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const formidable = require("express-formidable");
const {
  addProduct,
  getProduct,
  searchProduct,
  productPhoto,
  deleteProduct,
  updateProduct,
} = require("../service/productService");

const router = express.Router();

router.post("/create-product", formidable(), addProduct);

router.get("/get-product", getProduct);

router.get("/search-product/:slug", searchProduct);

router.get("/product-photo/:pid", productPhoto);

router.delete("/delete-product/:pid", deleteProduct);

router.put("/update-product/:pid", formidable(), updateProduct);

module.exports = router;
