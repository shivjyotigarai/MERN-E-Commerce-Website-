import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, restrictToAdmin } from "../controllers/authController.js";
const router = express.Router();
router.use(protect);
router.post("/", addOrderItems);
router.get("/myorders", getMyOrders);
router.get("/:id", getOrderById);
router.get("/:id/deliver", updateOrderToDelivered);
router.get("/:id/pay", updateOrderToPaid);

// restrict to admin
router.use(restrictToAdmin);
router.get("/", getOrders);

export default router;
