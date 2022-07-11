import express from "express";
import Cart from "../models/cartModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();
// get all products
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const cartDetails = await Cart.find({ user: req.params.id });
    if (!cartDetails) {
      // error
    }
    res.status(200).json({
      status: "success",
      data: {
        cartDetails,
      },
    });
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.body.user });
    // const user = await User.findOne({ email }).select("+password");
    if (!cart) {
      console.log("new cart");
      console.log(req.body);
      const newCart = await Cart.create({
        user: req.body.user,
        items: req.body.items,
        totalQuantity: req.body.totalQuantity,
        paymentMethod: req.body.paymentMethod,
        shippingAddress: req.body.shippingAddress,
      });
      res.status(200).json({
        status: "success",
        data: {
          newCart,
        },
      });
      return;
    }
    console.log("old cart");
    const cartid = cart._id;
    console.log(req.body);
    cart.user = req.body.user;
    cart.items = req.body.items;
    cart.totalQuantity = req.body.totalQuantity;
    cart.paymentMethod = req.body.paymentMethod;
    cart.shippingAddress = req.body.shippingAddress;
    const newCart = await cart.save();
    console.log(newCart);
    res.status(200).json({
      status: "success",
      data: {
        newCart,
      },
    });
  })
);
export default router;
