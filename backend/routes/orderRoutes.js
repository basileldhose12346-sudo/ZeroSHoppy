const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const router = express.Router();

/* PLACE ORDER */

router.post("/place", async (req, res) => {

  try {

    const { productId, quantity, userId, size } = req.body;

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product || !user)
      return res.status(400).json({ message: "Invalid product/user" });

    /* ===== SHOES (SIZE BASED STOCK) ===== */

    if (product.category === "shoes") {

      if (!size)
        return res.status(400).json({ message: "Please select a size" });

      const sizeObj = product.sizes.find(s => s.size == size);

      if (!sizeObj)
        return res.status(400).json({ message: "Size not available" });

      if (sizeObj.stock < quantity)
        return res.status(400).json({ message: "Size out of stock" });

      /* reduce size stock */

      sizeObj.stock -= quantity;

    }

    /* ===== WATCHES (SINGLE STOCK) ===== */

    else {

      if (product.stock < quantity)
        return res.status(400).json({ message: "Not enough stock" });

      product.stock -= quantity;

    }

    await product.save();

    /* CREATE ORDER */

    const order = await Order.create({

      product:{
        id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        size: size || null
      },

      buyer:{
        id: user._id,
        username: user.username,
        address: user.shipping.address
      }

    });

    res.json({ message:"Order placed", order });

  }

  catch(err){

    res.status(500).json({ error: err.message });

  }

});


/* GET ALL ORDERS (ADMIN) */

router.get("/", async (req,res)=>{

  const orders = await Order.find().sort({createdAt:-1})

  res.json(orders)

});


/* DELETE ORDER (MARK COMPLETED) */

router.delete("/:id", async (req,res)=>{

  await Order.findByIdAndDelete(req.params.id)

  res.json({message:"Order completed"})

});

module.exports = router;