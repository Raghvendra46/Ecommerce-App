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
  productCount,
  productList,
  searchProductController,
  productCategoryController,
} = require("../service/productService");

const router = express.Router();

router.post("/create-product", formidable(), addProduct);

router.get("/get-product", getProduct);

router.get("/search-product/:slug", searchProduct);

router.get("/product-photo/:pid", productPhoto);

router.delete("/delete-product/:pid", deleteProduct);

router.put("/update-product/:pid", formidable(), updateProduct);

router.get("/product-count", productCount);

router.get("/product-list/:page", productList);

router.get("/search/:keyword", searchProductController);

router.get("/product-category/:slug", productCategoryController);

module.exports = router;
