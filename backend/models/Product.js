const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: Number,
  stock: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,

  /* primary image (first of gallery) */
  image: String,

  /* gallery images (3-5 uploaded by admin) */
  images: [String],

  /* for watches */
  stock: Number,

  /* for shoes */
  sizes: [sizeSchema]

},{timestamps:true});

module.exports = mongoose.model("Product", productSchema);