const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const authMW = require("../middleware/authMW");

router.get("/", authMW, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server eRror");
  }
});

module.exports = router;
