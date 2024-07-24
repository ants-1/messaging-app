import User from "../models/User.js";
import passport from "passport";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from "../config/verifyToken.js";

// @desc    sign up new user
// route    POST /sign-up
const sign_up = asyncHandler(async (req, res, next) => {
  const existinUser = await User.findOne({ username: req.body.username });

  if (existinUser) {
    return res
      .status(404)
      .json({ error: `Username ${(req, body.username)} already exist.` });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      avatar_url: req.body.avatar_url,
      status: req.body.status,
    });
    await newUser.save();

    res.json({ message: "User signed in", newUser });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "User could not be added." });
  }
});

// @desc    login user
// route    POST /login
const login = [
  passport.authenticate("local", { session: false }),
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }

    // Change user.status to True to let people know they're online

    jwt.sign({ user: user }, process.env.SECRET_KEY, (err, token) => {
      return res.status(200).json({
        message: "Authentication successful",
        token: token,
      });
    });
  }),
];

// @desc    logout current user
// route    GET /logout
const logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(404).json({ error: "Unable to logout." });
    }

    // Change user.status to False to let people know they're offline

    res.status(200).json({ success: "Logout successful." });
  });
});

// @desc    get user profile
// route    GET /profile/:userId
const get_profile = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Username not found." });
    }

    res.status(200).json({ user });
  }),
];

// @desc    update current user profile
// route    PUT /profile/:userId
const update_profile = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const updatedUser = {
      username: req.body.username,
      email: req.body.email,
      avatar_url: req.body.avatar_url,
      status: req.body.status,
    };

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Username not found." });
    }

    res.status(200).json({ message: "Update profile successful", user });
  }),
];

// @desc  get all users 
// route  GET /users
const get_users = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();

  if (!users) {
    return res.status(404).json({ message: "No users found"});
  }

  res.status(200).json(users);
});

export default {
  sign_up,
  login,
  logout,
  get_profile,
  update_profile,
  get_users,
};
