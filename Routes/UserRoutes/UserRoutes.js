const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../user");

// To Get All Registered Users info
router.get("/allUserInfo", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/registerData", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = new User(userData);
    await newUser.save();
    res.send(true);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
