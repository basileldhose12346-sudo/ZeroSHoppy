const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// REGISTER BUYER
router.post("/register", async (req, res) => {
  try {
    const { username, password, shipping } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      role: "buyer",
      shipping
    });

    res.json({ message: "Registered", user });

  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid" });

  res.json({
    message: "Login success",
    user
  });
});

router.get("/", async (req,res)=>{
  const users = await User.find();
  res.json(users);
});
module.exports = router;