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
  productFiltersController,
  relatedProductController,
  googlePayPaymentController,
  createOrder,
  verifyPayment,
} = require("../service/productService");

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  addProduct
);

router.get("/get-product", getProduct);

router.get("/search-product/:slug", searchProduct);

router.get("/product-photo/:pid", productPhoto);

router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProduct);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

router.get("/product-count", productCount);

router.get("/product-list/:page", productList);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", relatedProductController);

router.get("/product-category/:slug", productCategoryController);

router.post("/product-filters", productFiltersController);

router.post("/googlepay/payment", googlePayPaymentController);

router.post("/razorpay/create-order", createOrder);

router.post("/razorpay/verify", verifyPayment);

module.exports = router;
