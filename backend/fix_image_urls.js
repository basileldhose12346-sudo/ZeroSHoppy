/**
 * fix_image_urls.js
 * 
 * Run this script from your backend folder:
 *   node fix_image_urls.js
 *
 * What it does:
 *   - Connects to your MongoDB
 *   - Finds all products
 *   - Strips backticks, extra spaces, and any old path prefixes from image URLs
 *   - Replaces them with the correct format: /images/filename.jpg
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

async function fixImageURLs() {

  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");

  const products = await Product.find();
  console.log(`Found ${products.length} products\n`);

  let fixedCount = 0;

  for (let p of products) {

    let original = p.image;

    // Remove backticks, leading/trailing whitespace
    let fixed = original.replace(/`/g, "").trim();

    // Remove any old prefixes like "images/" or "./images/" or "C:/..." paths
    // Extract just the filename
    const filename = fixed.split("/").pop().split("\\").pop();

    // Set correct URL path
    fixed = `/images/${filename}`;

    if (fixed !== original) {
      p.image = fixed;
      await p.save();
      console.log(`FIXED: "${original}" → "${fixed}"`);
      fixedCount++;
    } else {
      console.log(`OK:    "${original}"`);
    }

  }

  console.log(`\nDone. Fixed ${fixedCount} / ${products.length} products.`);
  mongoose.disconnect();
}

fixImageURLs().catch(err => {
  console.error("Error:", err.message);
  mongoose.disconnect();
});
