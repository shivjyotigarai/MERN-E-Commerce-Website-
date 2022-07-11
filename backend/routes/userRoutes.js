import express from "express";
// const userController = require("./../controllers/userController");
import {
  signup,
  login,
  loginViaToken,
  protect,
  restrictToAdmin,
} from "../controllers/authController.js";
import {
  getUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/loginViaToken", loginViaToken);
router.use(protect);
router.get("/me", getUser);
router.patch("/profile", updateUserProfile);
router.use(restrictToAdmin);
// router.patch("/updateMyPassword", authController.updatePassword);
router.get("/", getAllUsers);
router.route("/admin/:id").get(getUserById).put(updateUser);
export default router;
