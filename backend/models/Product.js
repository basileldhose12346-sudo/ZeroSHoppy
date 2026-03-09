const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: Number,
  stock: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,

  /* for watches */
  stock: Number,

  /* for shoes */
  sizes: [sizeSchema]

},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);