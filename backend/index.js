require('dotenv').config();
const express=require('express');
const  bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dns = require("node:dns");
const cors=require('cors');
const helmet=require('helmet');
const users=require('./src/routes/user.routes');
let app=express();
app.use(bodyparser.urlencoded({
    extended:true,limit:'150mb'

}));

var port = 4321;

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

mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000, family: 4 }).then(()=>{
  console.log("DataBase Connected Successfully");
}).catch((err)=>{
  console.log("Error Connecting to database");
  console.log(err);
});

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(users);

const server = app.listen(port, function () {
  console.log("SERVER RUNNING ON PORT: " + port);
});
