const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { uploadImage } = require("../controllers/uploadController");
const upload = require("../utils/upload");

router.post("/", auth, upload.single("image"), uploadImage);
module.exports = router;
