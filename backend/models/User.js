const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "buyer"], default: "buyer" },
  shipping: {
    name: String,
    email: String,
    address: String,
    zip: String,
    city: String,
    state: String,
    country: String,
    languages: [String]
  }
});

module.exports = mongoose.model("User", userSchema);