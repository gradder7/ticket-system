const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@description-> register a new user
//@route   /api/users
//@acess public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    //    return res.status(400).json({message:'Please include all fields'})
    res.status(400);
    // this will return us a html file in request
    throw new Error("Please include all fields");
  }

  //find if user alreday exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //hash password
  // salt=>
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data!");
  }
  //   res.send("Register-User");
});

//@description-> login a new user
//@route   /api/users/login
//@acess public
const loginUser = asyncHandler(async (req, res) => {
  //get email and password
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
  res.send("Login-User");
});

//@description-> get current user
//@route   /api/users/me
//@acess private
const getMe = asyncHandler(async (req, res) => {
  //   res.send("me");
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  // now we will get the user
  res.status(200).json(user);
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
