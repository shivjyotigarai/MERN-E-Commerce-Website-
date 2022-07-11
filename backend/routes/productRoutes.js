import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { protect, restrictToAdmin } from "../controllers/authController.js";
const router = express.Router();
// get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
router.post(
  "/",
  protect,
  restrictToAdmin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      brand: "undefined",
      category: "undefined",
      countInStock: 0,
      createdAt: Date.now(),
      description: "undefined",
      image: "undefined",
      name: "undefined",
      numsReviews: 0,
      price: 0.0,
      rating: 0.0,
      reviews: [],
      updatedAt: Date.now(),
      user: req.user._id,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);
// get a particular product
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      next(error);
    } else res.json(product);
  })
);
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const obj = {};
      req.body.name
        ? (obj["name"] = req.body.name)
        : (obj["name"] = req.user.name);
      req.body.price ? (obj["price"] = req.body.price) : (obj["price"] = 0);
      req.body.image
        ? (obj["image"] = req.body.image)
        : (obj["image"] =
            "https://i.ibb.co/Lzgtw9P/pexels-vie-studio-4439421.jpg");
      req.body.brand
        ? (obj["brand"] = req.body.brand)
        : (obj["brand"] = "undefined");
      req.body.category
        ? (obj["category"] = req.body.category)
        : (obj["category"] = "undefined");
      req.body.countInStock
        ? (obj["countInStock"] = req.body.countInStock)
        : (obj["countInStock"] = 0);
      req.body.description
        ? (obj["description"] = req.body.description)
        : (obj["description"] = "undefined");

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        obj,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
        status: "success",
        data: {
          product: updatedProduct,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  })
);
//router.route('/:id/reviews').post(protect, createProductReview)
router.post(
  "/:id/reviews",
  protect,
  asyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      error.body = "Product not found";
      res.status(404).json({
        status: "fail",
        message: error,
      });
      return;
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      const error = new Error("Already Reviewed");
      error.status = 404;
      error.body = "Already Reviewed";
      res.status(404).json({
        status: "fail",
        message: error,
      });
      return;
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  })
);
export default router;
//<a href="https://ibb.co/qkx40Zw"><img src="https://i.ibb.co/t83NZd5/Screenshot-2022-06-29-at-4-24-41-PM.png" alt="Screenshot-2022-06-29-at-4-24-41-PM" border="0"></a>
