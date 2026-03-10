const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const router = express.Router();

// ADD PRODUCT (with image upload)
router.post("/add", upload.single("image"), async (req, res) => {
  try {

    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.body.data) {
      return res.status(400).json({ error: "No product data received" });
    }

    const data = JSON.parse(req.body.data);

    if (req.file) {
      // Full URL so it works when frontend is opened via file://
      data.image = "http://localhost:5000/images/" + req.file.filename;
    } else {
      data.image = "";
    }

    const product = await Product.create(data);
    res.json(product);

  } catch (err) {
    console.error("Add product error:", err.message);
    res.status(500).json({ error: err.message });
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