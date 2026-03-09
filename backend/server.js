const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => console.log("Server running on 5000"));