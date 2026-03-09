const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;