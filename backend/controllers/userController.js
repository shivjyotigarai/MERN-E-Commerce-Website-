import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  //response
  if (!users) {
    const error = new Error("Users Not Found");
    error.status = 404;
    error.body = "Users Not Found";
    res.status(404).json({
      status: "fail",
      message: error,
    });
    return;
  }
  res.status(500).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
};
const getUser = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);
  // const product = await Product.findById(req.params.id);
  console.log(user);
  console.log(id);
  if (!user) {
    const error = new Error("User Not Found");
    error.status = 404;
    error.body = "User Not Found";
    res.status(404).json({
      status: "fail",
      message: error,
    });
    return;
  }
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      user,
    },
  });
});

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      error.body = "User Not Found";
      res.status(404).json({
        status: "fail",
        message: error,
      });
      return;
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const obj = {};
    req.body.name
      ? (obj["name"] = req.body.name)
      : (obj["name"] = req.user.name);
    req.body.email
      ? (obj["email"] = req.body.email)
      : (obj["email"] = req.user.email);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, obj, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      error.body = "User Not Found";
      res.status(404).json({
        status: "fail",
        message: error,
      });
      return;
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export { getAllUsers, getUser, updateUserProfile, getUserById, updateUser };
// router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);
