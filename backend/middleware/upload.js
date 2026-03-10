const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to frontend/images regardless of where node is run from
const uploadDir = path.join(__dirname, "../../frontend/images");

// Create the folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports = multer({ storage: storage });