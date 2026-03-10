const mongoose = require("mongoose");
const dns = require("node:dns");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("Missing MongoDB URI. Set MONGO_URI or MONGO_URL in .env");
  }

  dns.setDefaultResultOrder("ipv4first");
  const mongoDnsServers = (process.env.MONGO_DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
  if (mongoDnsServers.length > 0) {
    dns.setServers(mongoDnsServers);
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000, family: 4 });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
