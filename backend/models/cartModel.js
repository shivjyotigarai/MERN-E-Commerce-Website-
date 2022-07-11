import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        id: {},
        title: {},
        quantity: {},
        total: {}, //total cost
        price: {}, //single
        countInStock: {},
        image: {},
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
    },
    paymentMethod: {},
    shippingAddress: {},
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
