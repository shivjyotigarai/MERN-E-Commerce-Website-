import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signup = async (req, res, next) => {
  try {
    // if (req.body.role === "admin") req.body.role = "user";
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log("hello");
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error("Enter email and password");
    error.status = 404;
    error.body = "Enter email and password";
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }

  const user = await User.findOne({ email }).select("+password");
  console.log("LOGIN ROUTE");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    const error = new Error("Incorrect email and password");
    error.status = 404;
    error.body = "Incorrect email and password";
    res.status(404).json({
      status: "fail",
      message: error,
    });
    return;
  }
  createSendToken(user, 200, res);
};
const loginViaToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return;
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      const error = new Error(
        "The user belonging to this token does no longer exist."
      );
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const protect = async (req, res, next) => {
  try {
    let token;
    console.log(req.headers);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      console.log("token");
      console.log(token);
      const error = new Error("Not Logged In");
      error.status = 404;
      error.body = "Not Logged In";
      res.status(404).json({
        status: "fail",
        message: error,
      });
      return;
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      const error = new Error("Current User No Longer exist");
      error.status = 404;
      error.body = "Current User No Longer exist";
      res.status(404).json({
        status: "fail",
        message: error,
      });
      return;
    }

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new AppError(
    //       "User recently changed password! Please log in again.",
    //       401
    //     )
    //   );
    // }
    req.user = currentUser;
    console.log("protected route successfully passed !!");
    next();
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const restrictToAdmin = (req, res, next) => {
  //middleware function
  if (!req.user.isAdmin) {
    const error = new Error("Not Authorized");
    error.status = 404;
    error.body = "Not Authorized";
    res.status(404).json({
      status: "fail",
      message: error,
    });
    return;
  }
  console.log("Admin Check route passed");
  next();
};
export { signup, login, loginViaToken, protect, restrictToAdmin };
