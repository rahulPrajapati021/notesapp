const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verfiyToken");
const { User } = require("../models/association");
const {
  getUserByUsernameOrEmail,
  generateToken,
  setTokenCookie,
} = require("../functions/userFunctions");

function test(req, res, next) {
  res.json({ success: true });
}

// post request -
// register controller -

async function registerUser(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ msg: "username, password & email are mandatory fields" });
  }
  let existingUser = await getUserByUsernameOrEmail(username, email);
  if (existingUser) {
    return res.status(409).json({ msg: "Username or email already in use" });
  }

  try {
    let user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    user.password = undefined;
    let token = generateToken(user);
    setTokenCookie(res, token);
    res.json({ msg: "User registration successfull", user: user });
  } catch (error) {
    res.json({ msg: "Internal server error" });
  }
}

// login controller -

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "email & password are required fields" });
  }
  let existingUser = await getUserByUsernameOrEmail("", email);
  if (!existingUser) {
    return res.status(400).json({ msg: "username or password incorrect" });
  } else if (existingUser.password != password) {
    return res.status(400).json({ msg: "username or password incorrect" });
  }
  let token = generateToken(existingUser);
  setTokenCookie(res, token);
  res.json({msg: "User login successfull", token });
}

// logout controller -

function logoutUser(req, res) {
  res
    .clearCookie("token")
    .status(200)
    .json({msg: "User logout successfull" });
}

// get request -
// detials controller -

async function userDetail(req, res) {
  let user = await getUserByUsernameOrEmail("", req.userEmail);
  user.password = undefined;
  res.json({msg: "User details", user: user });
}

module.exports = { test, registerUser, loginUser, logoutUser, userDetail };
