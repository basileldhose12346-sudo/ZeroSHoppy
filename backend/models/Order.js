const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    quantity: Number,
  },
  buyer: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
    address: String,
  },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);